const express = require("express");
const {
  addProcedure,
  deleteProcedure,
  editProcedure,
  getProcedure,
} = require("../controller/procedures");
const {
  checkRateLimit,
  logApiAccess,
  verifyToken,
  checkProcedureID,
} = require("../controller/middlewares");
const router = express.Router();
router.post("/", [verifyToken, checkRateLimit, logApiAccess], addProcedure);
router.get(
  "/:id",
  [checkProcedureID, verifyToken, checkRateLimit, logApiAccess],
  getProcedure
);
router.put(
  "/:id",
  [checkProcedureID, verifyToken, checkRateLimit, logApiAccess],
  editProcedure
);
router.delete(
  "/:id",
  [checkProcedureID, verifyToken, checkRateLimit, logApiAccess],
  deleteProcedure
);
module.exports = router;
