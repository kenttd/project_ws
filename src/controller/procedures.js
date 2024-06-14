const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
require("dotenv").config();
const Procedures = require("../model/procedures");
const axios = require("axios").default;

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
    const procedure = req.body.procedure;
    if (req.query.currency) {
      const response = await axios.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
      );
      if (response.data[req.query.currency] === undefined) {
        return res.status(400).json({ message: "Currency not found" });
      }
      const { data: responseFin } = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`
      );
      const rate = responseFin.usd[req.query.currency];
      procedure.price = (procedure.price * rate).toFixed(2);
    }
    return res
      .status(200)
      .json({ procedure, currency: req.query.currency || "USD" });
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
    return res.status(200).json({ message: "Procedure deleted" });
  },
};
