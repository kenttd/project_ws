const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
module.exports = {
  addPatient: async function (req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        date_of_birth: Joi.date().format("YYYY-MM-DD").required,
        sex: Joi.string().required(),
      }).unknown(true);
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const patient = await Patients.create(value);
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editPatient: async function (req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        date_of_birth: Joi.date().format("YYYY-MM-DD").required(),
        sex: Joi.string().required(),
      }).unknown(true);
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const patient = req.body.patient;
      patient.name = value.name;
      patient.email = value.email;
      patient.phone = value.phone;
      patient.address = value.address;
      patient.date_of_birth = value.date_of_birth;
      patient.sex = value.sex;
      await patient.save();
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getSpecificPatient: async function (req, res) {
    return res.status(200).json(req.body.patient);
  },
};
