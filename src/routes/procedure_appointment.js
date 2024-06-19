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
  checkPatientID,
} = require("../controller/middlewares");
router.get(
  "/:id",
  [verifyToken, checkRateLimit, logApiAccess],
  getProcedureAppointment
);
router.post(
  "/",
  [verifyToken, checkRateLimit, logApiAccess],
  addProcedureAppointment
);
const router = express.Router();
