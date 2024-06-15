const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();
const Hospitals = require("../model/hospitals");
const Patients = require("../model/patients");
var nodemailer = require("nodemailer");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
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
      const styledEmail = getStyledEmail(hospital);
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: hospital.email,
        subject: `Confirmation of Your Tier ${hospital.tier} Subscription - ${hospital.name}`,
        html: styledEmail,
      });
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

function getStyledEmail(hospital) {
  return `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #555;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Subscription Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${hospital.name} Team,</p>
            <p>We are excited to confirm your subscription to our web service. Below are the details of your subscription:</p>
            <h2>Hospital Details:</h2>
            <ul>
              <li><strong>Name:</strong> ${hospital.name}</li>
              <li><strong>Address:</strong> ${hospital.address}</li>
              <li><strong>Phone:</strong> ${hospital.phone}</li>
              <li><strong>Email:</strong> ${hospital.email}</li>
              <li><strong>Website:</strong> <a href="${hospital.website}">${hospital.website}</a></li>
            </ul>
            <h2>Subscription Details:</h2>
            <ul>
              <li><strong>Tier Level:</strong> Tier ${hospital.tier}</li>
              <li><strong>API Key:</strong> ${hospital.api_key}</li>
              <li><strong>API Key Expiration Date:</strong> ${hospital.api_key_end_date}</li>
            </ul>
            <p>We are thrilled to have you onboard and are committed to providing you with the highest level of service. Should you have any questions or need any assistance, please do not hesitate to reach out to our support team at support@yourwebservice.com.</p>
            <p>Thank you for choosing our service. We look forward to supporting your hospital's needs.</p>
            <p>Best regards,</p>
            <p><strong>Your Company Name Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>Contact Us:</strong></p>
            <p>Your Company Name</p>
            <p>Company Address</p>
            <p>Company Phone</p>
            <p>Company Email</p>
            <p><a href="Company Website">Company Website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
}
