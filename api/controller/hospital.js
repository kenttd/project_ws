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
};
