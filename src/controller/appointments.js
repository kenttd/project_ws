const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Providers = require("../model/providers");
const Patients = require("../model/patients");
const Appointments = require("../model/appointments");
module.exports = {
  addAppointment: async function (req, res) {
    const schema = Joi.object({
      provider_id: Joi.number()
        .required()
        .external(async (value, helper) => {
          const provider = await Providers.findByPk(value);
          if (!provider) throw new Error("Invalid provider id");
          return true;
        }),
      patient_id: Joi.number()
        .required()
        .external(async (value, helpers) => {
          const patient = await Patients.findByPk(value);
          if (!patient) throw new Error("Invalid patient id");
          return value;
        }),
      date: Joi.date().format("DD-MM-YYYY").required(),
      time: Joi.string().required(),
      status: Joi.string().required(),
      reason_for_visit: Joi.string().required(),
      notes: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const newAppointment = await Appointments.create({
      hospital_id: req.body.hospital.id,
      ...req.body,
    });
    return res.status(201).json(newAppointment);
  },
  getAppointment: async function (req, res) {
    return res.status(200).json({ Appointment: req.body.appointment });
  },
  editAppointment: async function (req, res) {
    const schema = Joi.object({
      provider_id: Joi.number()
        .required()
        .external(async (value, helper) => {
          const provider = await Providers.findByPk(value);
          if (!provider) throw new Error("Invalid provider id");
          return true;
        }),
      patient_id: Joi.number()
        .required()
        .external(async (value, helpers) => {
          const patient = await Patients.findByPk(value);
          if (!patient) throw new Error("Invalid patient id");
          return value;
        }),
      date: Joi.date().format("DD-MM-YYYY").required(),
      time: Joi.string().required(),
      status: Joi.string().required(),
      reason_for_visit: Joi.string().required(),
      notes: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const appointment = req.body.appointment;
    appointment.provider_id = req.body.provider_id;
    appointment.patient_id = req.body.patient_id;
    appointment.date = req.body.date;
    appointment.time = req.body.time;
    appointment.status = req.body.status;
    appointment.reason_for_visit = req.body.reason_for_visit;
    appointment.notes = req.body.notes;
    await appointment.save();
    return res.status(200).json(appointment);
  },
  deleteAppointment: async function (req, res) {
    const appointment = req.body.appointment;
    await appointment.destroy();
    return res.status(204).json({ message: "Appointment deleted" });
  },
};
