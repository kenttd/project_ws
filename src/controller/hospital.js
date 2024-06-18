const Joi = require("joi").extend(require("@joi/date"));
const { google } = require("googleapis");
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
require("dotenv").config();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BASE_URL}/api/hospital/callback`
);
const scopes = ["https://www.googleapis.com/auth/calendar"];
module.exports = {
  getHospital: async function (req, res) {
    try {
      const hospital = await Hospitals.findByPk(req.params.id, {
        attributes: {
          exclude: ["refresh_token", "api_key", "api_key_end_date", "tier"],
        },
      });
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
  authenticate: async function (req, res) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
      state: req.body.hospital.id,
      prompt: "consent",
    });
    return res.status(200).json({ url: authorizationUrl });
  },
  callback: async function (req, res) {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    const id = req.query.state;
    const hospital = await Hospitals.findByPk(id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    hospital.refresh_token = tokens.refresh_token;
    await hospital.save();
    // oauth2Client.setCredentials(tokens);
    return res
      .status(200)
      .json({ message: "Successfully authenticated", tokens });
  },
  test: async function (req, res) {
    oauth2Client.setCredentials({
      refresh_token: req.body.hospital.refresh_token,
    });
    // Example API request
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const result = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    return res.status(200).json(result.data.items);
  },
};
