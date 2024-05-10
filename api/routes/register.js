const express = require("express");
const { registerHospital, registerPatient } = require("../controller/register");
// const { checkApiKey, balanceMinimum } = require("../middleware/middlewares");
const router = express.Router();
// router.put("/", [checkApiKey, balanceMinimum(1000)], recharge);
router.post("/hospital", registerHospital);
router.post("/patient", registerPatient);
router.get("/test", (req, res) => {
  res.send("Hello World");
});
module.exports = router;
