const express = require("express");
const { getHospital } = require("../controller/hospital");
// const { checkApiKey, balanceMinimum } = require("../middleware/middlewares");
const router = express.Router();
// router.put("/", [checkApiKey, balanceMinimum(1000)], recharge);
router.get("/:id", getHospital);
module.exports = router;
