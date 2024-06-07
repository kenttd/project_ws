const express = require("express");
const {
  getAllProvider,
  getSpecificAllProvider,
  addProvider,
  updateProvider,
  deleteProvider,
} = require("../controller/provider");
const {
  checkRateLimit,
  logApiAccess,
  verifyToken,
  checkProviderSameAsHospital,
} = require("../controller/middlewares");
const router = express.Router();
router.get("/", [verifyToken, checkRateLimit, logApiAccess], getAllProvider);
router.get(
  "/:id",
  [verifyToken, checkProviderSameAsHospital, checkRateLimit, logApiAccess],
  getSpecificAllProvider
);
router.post("/", [verifyToken, checkRateLimit, logApiAccess], addProvider);
router.put(
  "/:id",
  [verifyToken, checkProviderSameAsHospital, checkRateLimit, logApiAccess],
  updateProvider
);
router.delete(
  "/:id",
  [verifyToken, checkProviderSameAsHospital, checkRateLimit, logApiAccess],
  deleteProvider
);
module.exports = router;
