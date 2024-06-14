const express = require("express");
const {
  getHospital,
  editHospital,
  authenticate,
  callback,
  test,
} = require("../controller/hospital");
const {
  checkRateLimit,
  logApiAccess,
  verifyApiKey,
  verifyToken,
  ensureOwnership,
} = require("../controller/middlewares");
const router = express.Router();
// router.get("/test", [verifyToken], test);
router.get("/authenticate", [verifyToken], authenticate);
router.get("/callback", callback);
router.get("/:id", [verifyToken, checkRateLimit, logApiAccess], getHospital);
router.put("/", [verifyToken, checkRateLimit, logApiAccess], editHospital);

module.exports = router;
