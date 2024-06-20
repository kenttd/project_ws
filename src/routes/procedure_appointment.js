const express = require("express");
const {
  getProcedureAppointment,
  addProcedureAppointment,
  deleteProcedureAppointment,
} = require("../controller/procedure_appointment");
const {
  checkRateLimit,
  logApiAccess,
  verifyToken,
  checkAppointmentID,
} = require("../controller/middlewares");
const router = express.Router();
router.get(
  "/:id",
  [checkAppointmentID, verifyToken, checkRateLimit, logApiAccess],
  getProcedureAppointment
);
router.post(
  "/",
  [verifyToken, checkRateLimit, logApiAccess],
  addProcedureAppointment
);
router.delete(
  "/:id",
  [checkAppointmentID, verifyToken, checkRateLimit, logApiAccess],
  deleteProcedureAppointment
);
module.exports = router;
