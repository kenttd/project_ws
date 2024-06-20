const Joi = require("joi").extend(require("@joi/date"));
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Providers = require("../model/providers");
const Patients = require("../model/patients");
const procedureAppointment = require("../model/procedure_appointment");
module.exports = {
  getProcedureAppointment: async function (req, res) {
    const appointment_id = req.params.id;
    const appointments = await procedureAppointment.findAll({
      where: {
        appointment_id: appointment_id,
      },
    });
    return res.status(200).json(appointments);
  },
  addProcedureAppointment: async function (req, res) {
    const procedures = req.body.procedures;
    const appointment_id = req.body.appointment_id;
    if (Array.isArray(procedures) === false) {
      const procedure = await procedureAppointment.create({
        appointment_id: appointment_id,
        procedure_id: procedures,
      });
      return res.status(201).json({
        message: "Procedure appointment added",
      });
    }

    for (let i = 0; i < procedures.length; i++) {
      const procedure = await procedureAppointment.create({
        appointment_id: appointment_id,
        procedure_id: procedures[i],
      });
    }
    return res.status(201).json({
      message: "Procedure appointment added",
    });
  },
  deleteProcedureAppointment: async function (req, res) {
    const appointment_id = req.params.id;

    const procedures = req.body.procedures;
    if (Array.isArray(procedures) === false) {
      await procedureAppointment.destroy({
        where: { appointment_id: appointment_id, procedure_id: procedures },
      });
      return res.status(200).json({ message: "Procedure deleted" });
    }
    for (let i = 0; i < procedures.length; i++) {
      await procedureAppointment.destroy({
        where: { appointment_id: appointment_id, procedure_id: procedures[i] },
      });
    }
    return res.status(200).json({ message: "Procedure deleted" });
  },
};
