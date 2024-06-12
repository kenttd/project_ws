const express = require("express");
const {
  addAppointment,
  getAppointment,
  editAppointment,
  deleteAppointment,
} = require("../controller/appointments");
const {
  checkRateLimit,
  logApiAccess,
  verifyToken,
  checkAppointmentID,
} = require("../controller/middlewares");
const router = express.Router();

router.get(
  "/:id",
  [checkAppointmentID, verifyToken, logApiAccess, checkRateLimit],
  getAppointment
);
router.post("/", [verifyToken, logApiAccess, checkRateLimit], addAppointment);
router.put(
  "/:id",
  [checkAppointmentID, verifyToken, logApiAccess, checkRateLimit],
  editAppointment
);
router.delete(
  "/:id",
  [checkAppointmentID, verifyToken, logApiAccess, checkRateLimit],
  deleteAppointment
);

module.exports = router;
