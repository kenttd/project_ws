const Joi = require("joi").extend(require("@joi/date"));
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
const supabase = require("../config/supabase");
const axios = require("axios").default;
const fs = require("fs");
require("dotenv").config();

module.exports = {
  addPatient: async function (req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        date_of_birth: Joi.string().required(),
        sex: Joi.string().required(),
      }).unknown(true);
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const file = createFileObject(req.file);
      const { data, errorSupabase } = await supabase.storage
        .from("project_ws")
        .upload(req.file.originalname, file, {
          contentType: req.file.mimetype,
        });
      fs.unlinkSync(req.file.path);
      if (errorSupabase) {
        return res.status(500).json({ message: errorSupabase.message });
      }
      const link = `https://ovntecrpiucwgbhtntsg.supabase.co/storage/v1/object/public/project_ws/${data.path}`;
      const { data: dataAxios } = await axios.post(
        `https://api.tinyurl.com/create?api_token=${process.env.TINYURL_API_KEY}`,
        {
          url: link,
          domain: "tinyurl.com",
          description: "string",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      value.profile_picture = dataAxios.data.tiny_url;
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
        date_of_birth: Joi.string().required(),
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

function createFileObject(fileInfo) {
  const { originalname, mimetype, path } = fileInfo;
  const fileContent = fs.readFileSync(path);
  const file = new File([fileContent], originalname, { type: mimetype });
  return file;
}
