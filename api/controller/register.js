const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
module.exports = {
  registerHospital: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      website: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const hospital = new Hospitals(value);
    try {
      await hospital.save();
      return res
        .status(201)
        .json({ message: "Hospital registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  registerPatient: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      dob: Joi.date().format("YYYY-MM-DD").required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const patient = new Patients(value);
    try {
      await patient.save();
      return res
        .status(201)
        .json({ message: "Patient registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
