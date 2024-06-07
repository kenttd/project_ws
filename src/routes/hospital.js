const express = require("express");
const { getHospital, editHospital } = require("../controller/hospital");
const {
  checkRateLimit,
  logApiAccess,
  verifyApiKey,
  verifyToken,
  ensureOwnership,
} = require("../controller/middlewares");
const router = express.Router();

router.get("/:id", [verifyToken, checkRateLimit, logApiAccess], getHospital);
router.put("/", [verifyToken, checkRateLimit, logApiAccess], editHospital);

module.exports = router;