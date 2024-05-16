const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
const AccessLog = require("../model/access_log");
module.exports = {
  verifyApiKey: async function (req, res, next) {
    const schema = Joi.object({
      "x-api-key": Joi.string().required(),
    }).unknown(true);
    const { error, value } = schema.validate(req.headers);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const hospital = await Hospitals.findOne({
      where: {
        api_key: value["x-api-key"],
      },
    });
    if (!hospital) {
      return res.status(401).json({ message: "Invalid API Key" });
    }
    req.body.hospital = hospital;
    next();
  },
  verifyToken: async function (req, res, next) {
    try {
      var decoded = jwt.verify(
        req.headers["authorization"].split(" ")[1],
        process.env.SECRET_KEY
      );
      req.body.hospital = await Hospitals.findByPk(decoded.id);
      next();
    } catch (err) {
      if (err.name == "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token", err });
    }
  },
  logApiAccess: async function (req, res, next) {
    const accessLog = new AccessLog({
      api_key: req.body.hospital.api_key,
      endpoint: req.url,
    });
    await accessLog.save();
    next();
  },
  checkRateLimit: async function (req, res, next) {
    const accessLogs = await AccessLog.findAll({
      where: {
        api_key: req.body.hospital.api_key,
        access_time: {
          [Op.gt]: new Date(new Date() - 60 * 1000),
        },
      },
    });
    if (accessLogs.length > req.body.hospital.tier * 1) {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }
    next();
  },
  ensureOwnership: async function (req, res, next) {
    if (!req.params.id || req.params.id != req.body.hospital.id)
      return res.status(401).json({ message: "Unauthorized" });
    next();
  },
};
