const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
module.exports = {
  getToken: async function (req, res) {
    const token = jwt.sign(
      {
        id: req.body.hospital.id,
        name: req.body.hospital.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token, expires_in: "1h" });
  },
};
