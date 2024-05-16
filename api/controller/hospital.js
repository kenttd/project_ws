const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
module.exports = {
  getHospital: async function (req, res) {
    try {
      const hospital = await Hospitals.findByPk(req.params.id);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      return res.status(200).json(hospital);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editHospital: async function (req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        website: Joi.string().required(),
      }).unknown(true);
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const hospital = req.body.hospital;
      hospital.name = req.body.name;
      hospital.address = req.body.address;
      hospital.phone = req.body.phone;
      hospital.email = req.body.email;
      hospital.website = req.body.website;
      await hospital.save();
      return res.status(200).json(hospital);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
