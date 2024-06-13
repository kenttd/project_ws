const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Providers = require("../model/providers");
const Patients = require("../model/patients");
const Appointments = require("../model/appointments");
const { DateTime } = require("luxon");
require("dotenv").config();
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BASE_URL}/api/hospital/callback`
);
const scopes = ["https://www.googleapis.com/auth/calendar"];

module.exports = {
  addAppointment: async function (req, res) {
    let patient;
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
          patient = await Patients.findByPk(value);
          if (!patient) throw new Error("Invalid patient id");
          return value;
        }),
      date: Joi.date().format("DD/MM/YYYY").required(),
      time: Joi.string().required(),
      status: Joi.string().required(),
      reason_for_visit: Joi.string().required(),
      notes: Joi.string().required(),
      duration: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const [startTime, endTime] = convertDateTime(
      req.body.date,
      req.body.time,
      parseInt(req.body.duration)
    );
    oauth2Client.setCredentials({
      refresh_token: req.body.hospital.refresh_token,
    });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    try {
      const resCal = await calendar.events.insert({
        calendarId: "primary",
        resource: {
          summary: `Appointment with ${patient.name}`,
          description: req.body.reason_for_visit,
          start: { dateTime: startTime },
          end: { dateTime: endTime },
        },
      });
      req.body.gcal_id = resCal.data.id;
    } catch (error) {
      return res.status(500).json({ message: "Error creating event", error });
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
    let patient;
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
          patient = await Patients.findByPk(value);
          if (!patient) throw new Error("Invalid patient id");
          return value;
        }),
      date: Joi.date().format("DD/MM/YYYY").required(),
      time: Joi.string().required(),
      status: Joi.string().required(),
      reason_for_visit: Joi.string().required(),
      notes: Joi.string().required(),
      duration: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const [startTime, endTime] = convertDateTime(
      req.body.date,
      req.body.time,
      parseInt(req.body.duration)
    );
    oauth2Client.setCredentials({
      refresh_token: req.body.hospital.refresh_token,
    });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    try {
      const resCal = await calendar.events.patch({
        calendarId: "primary",
        eventId: req.body.appointment.gcal_id,
        resource: {
          summary: `Appointment with ${patient.name}`,
          description: req.body.reason_for_visit,
          start: { dateTime: startTime },
          end: { dateTime: endTime },
        },
      });
      req.body.gcal_id = resCal.data.id;
    } catch (error) {
      return res.status(500).json({ message: "Error creating event", error });
    }
    const appointment = req.body.appointment;
    appointment.provider_id = req.body.provider_id;
    appointment.patient_id = req.body.patient_id;
    appointment.date = req.body.date;
    appointment.time = req.body.time;
    appointment.status = req.body.status;
    appointment.reason_for_visit = req.body.reason_for_visit;
    appointment.notes = req.body.notes;
    appointment.duration = req.body.duration;
    await appointment.save();
    return res.status(200).json(appointment);
  },
  deleteAppointment: async function (req, res) {
    oauth2Client.setCredentials({
      refresh_token: req.body.hospital.refresh_token,
    });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    calendar.events.delete(
      { calendarId: "primary", eventId: req.body.appointment.gcal_id },
      function (err) {
        if (err) {
          console.log("The API returned an error: " + err);
          return;
        }
        console.log("Event deleted.");
      }
    );
    const appointment = req.body.appointment;
    await appointment.destroy();
    return res.status(200).json({ message: "Appointment deleted" });
  },
};

function convertDateTime(dayStr, timeStr, durationMinutes) {
  // Parse day and time
  const day = DateTime.fromFormat(dayStr, "dd/MM/yyyy");
  const time = DateTime.fromFormat(timeStr, "HH:mm");
  let startDateTime = day.set({
    hour: time.hour,
    minute: time.minute,
    second: 0,
    millisecond: 0,
  });
  startDateTime = startDateTime.setZone("America/Los_Angeles");
  const endDateTime = startDateTime.plus({ minutes: durationMinutes });
  const startISO8601 = startDateTime.toISO({ suppressMilliseconds: true });
  const endISO8601 = endDateTime.toISO({ suppressMilliseconds: true });

  return [startISO8601, endISO8601];
}
