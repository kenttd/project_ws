const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
require("dotenv").config();
const Procedures = require("../model/procedures");
const { get } = require("../routes/procedures");
module.exports = {
  addProcedure: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      duration: Joi.string().required(),
      price: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const newProcedure = await Procedures.create({
      hospital_id: req.body.hospital.id,
      ...req.body,
    });
    return res.status(201).json(newProcedure);
  },
  getProcedure: async function (req, res) {
    return res.status(200).json({ procedure: req.body.procedure });
  },
  editProcedure: async function (req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      duration: Joi.string().required(),
      price: Joi.string().required(),
    }).unknown(true);
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch (validationError) {
      return res.status(400).json({
        message: validationError.message || validationError.details[0].message,
      });
    }
    const procedure = req.body.procedure;
    procedure.name = req.body.name;
    procedure.description = req.body.description;
    procedure.duration = req.body.duration;
    procedure.price = req.body.price;
    await procedure.save();
    return res.status(200).json(procedure);
  },
  deleteProcedure: async function (req, res) {
    await req.body.procedure.destroy();
    return res.status(204).json({ message: "Procedure deleted" });
  },
};
