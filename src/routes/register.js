const express = require("express");
const { registerHospital, registerPatient } = require("../controller/register");
const router = express.Router();
// router.put("/", [checkApiKey, balanceMinimum(1000)], recharge);
router.post("/hospital", registerHospital);
router.post("/patient", registerPatient);
module.exports = router;
