const express = require("express");
const {
  addPatient,
  editPatient,
  getSpecificPatient,
} = require("../controller/patient");
const {
  checkRateLimit,
  logApiAccess,
  verifyToken,
  checkPatientID,
} = require("../controller/middlewares");
const multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/" });

const router = express.Router();

router.get(
  "/:id",
  [checkPatientID, verifyToken, checkRateLimit, logApiAccess],
  getSpecificPatient
);
router.post(
  "/",
  [verifyToken, checkRateLimit, logApiAccess, upload.single("profile_picture")],
  addPatient
);
router.put(
  "/:id",
  [checkPatientID, verifyToken, checkRateLimit, logApiAccess],
  editPatient
);
module.exports = router;
