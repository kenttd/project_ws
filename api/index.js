const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const Associations = require("./src/model/associations")();

const registerRouter = require("../src/routes/register");
const hospitalRouter = require("../src/routes/hospital");
const providerRouter = require("../src/routes/provider");
const patientRouter = require("../src/routes/patient");
const tokenRouter = require("../src/routes/token");
const tiersRouter = require("../src/routes/tiers");

app.use("/api/register", registerRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/providers", providerRouter);
app.use("/api/patients", patientRouter);
app.use("/api/token", tokenRouter);
app.use("/api/tiers", tiersRouter);

const port = 3000;
app.listen(port, function (req, res) {
  console.log("Application running on http://localhost:" + port);
});
