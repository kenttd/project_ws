const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
const Providers = require("../model/providers");
const AccessLog = require("../model/access_log");
const Appointments = require("../model/appointments");
const Procedures = require("../model/procedures");
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
      return res
        .status(401)
        .json({
          message: "Invalid token",
          error: err.message,
          headers: req.headers,
        });
    }
  },
  logApiAccess: async function (req, res, next) {
    const accessLog = new AccessLog({
      api_key: req.body.hospital.api_key,
      endpoint: req.originalUrl,
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
  checkProviderSameAsHospital: async function (req, res, next) {
    if (!req.params.id)
      return res.status(400).json({ message: "Provider ID is required" });
    const provider = await Providers.findByPk(req.params.id);
    if (!provider || provider.hospital_id != req.body.hospital.id)
      return res.status(401).json({
        message: `Unauthorized. No provider with the ID ${req.params.id} is found in ${req.body.hospital.name}`,
      });
    req.body.provider = provider;
    next();
  },
  checkPatientID: async function (req, res, next) {
    if (!req.params.id)
      return res.status(400).json({ message: "Patient ID is required" });
    const patient = await Patients.findByPk(req.params.id);
    if (!patient)
      return res.status(400).json({ message: "Invalid patient ID" });
    req.body.patient = patient;
    next();
  },
  checkAppointmentID: async function (req, res, next) {
    if (!req.params.id)
      return res.status(400).json({ message: "Appointment ID is required" });
    const appointment = await Appointments.findByPk(req.params.id);
    if (!appointment)
      return res.status(400).json({ message: "Invalid appointment ID" });
    req.body.appointment = appointment;
    next();
  },
  checkProcedureID: async function (req, res, next) {
    if (!req.params.id)
      return res.status(400).json({ message: "Procedure ID is required" });
    const procedure = await Procedures.findByPk(req.params.id);
    if (!procedure)
      return res.status(400).json({ message: "Invalid procedure ID" });
    req.body.procedure = procedure;
    next();
  },
};
