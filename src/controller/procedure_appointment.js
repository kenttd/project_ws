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
  getProcedureAppointment: async function (req, res) {},
  deleteProcedureAppointment: async function (req, res) {},
};
