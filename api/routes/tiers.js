const express = require("express");
const { purchase, fail, success } = require("../controller/tiers");
const { verifyApiKey } = require("../controller/middlewares");
const router = express.Router();
// router.put("/", [checkApiKey, balanceMinimum(1000)], recharge);
router.get("/purchase", [verifyApiKey], purchase);
router.get("/success", success);
router.get("/fail", fail);
module.exports = router;
