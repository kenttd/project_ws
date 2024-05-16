const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
const BASE_URL = process.env.BASE_URL;
module.exports = {
  purchase: async function (req, res) {
    const schema = Joi.object({
      tier: Joi.number().required(),
      months: Joi.number().optional().default(1),
    }).unknown(true);
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 500 * value.tier,
            product_data: {
              name: `Tier ${value.tier}`,
            },
          },
          quantity: value.months,
        },
      ],
      mode: "payment",
      success_url: `${BASE_URL}/api/tiers/success?session_id={CHECKOUT_SESSION_ID}&months=${value.months}&tier=${value.tier}`,
      cancel_url: `${BASE_URL}/api/tiers/fail`,
    });
    return res.status(200).json({ payment_link: session.url });
  },
  success: async function (req, res) {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const hospital = await Hospitals.findOne({
      where: {
        email: session.customer_details.email,
      },
    });
    if (hospital) {
      hospital.tier = req.query.tier;
      hospital.api_key_end_date = new Date().setMonth(
        new Date().getMonth() + parseInt(req.query.months)
      );
      await hospital.save();
      return res.status(200).json({
        message: "Successfully purchased",
      });
    }
    return res.status(400).json({ message: "Invalid email" });
  },
  fail: async function (req, res) {
    return res.status(400).json({ message: "Payment failed" });
  },
};
