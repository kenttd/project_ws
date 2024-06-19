const express = require("express");
const { getToken } = require("../controller/token");
const {
  verifyApiKey,
  checkIfApiKeyIsExpired,
} = require("../controller/middlewares");
const router = express.Router();
// router.put("/", [checkApiKey, balanceMinimum(1000)], recharge);
router.get("/", [verifyApiKey], getToken);
module.exports = router;
