const Joi = require("joi").extend(require("@joi/date"));
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Providers = require("../model/providers");
const Patients = require("../model/patients");
const procedureAppointment = require("../model/procedure_appointment");
module.exports = {
  getProcedureAppointment: async function (req, res) {
    const procedureArray = req.body.procedureArray;
  },
  addProcedureAppointment: async function (req, res) {
    const procedureArray = req.body.procedureArray;
    const appointment_id = req.body.appointment_id;

    if(procedureArray.length === 0) {
      return res.status(400).json({
        message: "Procedure array is empty"
      });
    }

    if(Array.isArray(procedureArray) === false) {
      const procedure = await procedureAppointment.create({
        appointment_id: appointment_id,
        procedure_id: procedureArray,
      })

      return res.status(201).json({
        message: "Procedure appointment added"
      });
    }

    for (let i = 0; i < procedureArray.length; i++) {
      const procedure = await procedureAppointment.create({
        appointment_id: appointment_id,
        procedure_id: procedureArray[i],
      })
    }

    return res.status(201).json({
      message: "Procedure appointment added"
    });
  },
  getProcedureAppointment: async function (req, res) {},
  deleteProcedureAppointment: async function (req, res) {},
};
