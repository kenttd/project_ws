const Joi = require("joi").extend(require("@joi/date"));
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Providers = require("../model/providers");
const Patients = require("../model/patients");
module.exports = {
  getAllProvider: async function (req, res) {
    const listProvider = Providers.findAll({
      where: {
        hospital_id: req.body.hospital.id,
      },
    });
    return res
      .status(200)
      .json({ providers: listProvider, total: listProvider.length });
  },
  getSpecificAllProvider: async function (req, res) {
    return res.status(200).json({ provider: req.body.provider });
  },
  addProvider: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      department: Joi.string().required(),
    }).unknown(true);
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const provider = await Providers.create({
      name: value.name,
      email: value.email,
      phone: value.phone,
      department: value.department,
      hospital_id: req.body.hospital.id,
    });
    return res.status(201).json({ provider });
  },
  updateProvider: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      department: Joi.string().required(),
    }).unknown(true);
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const provider = req.body.provider;
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    provider.name = value.name;
    provider.email = value.email;
    provider.phone = value.phone;
    provider.department = value.department;
    provider.save();
    return res.status(200).json({ provider });
  },
  deleteProvider: async function (req, res) {
    const provider = req.body.provider;
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    provider.destroy();
    return res.status(200).json({ message: "Provider deleted" });
  },
};
