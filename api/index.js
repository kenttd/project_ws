const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const Associations = require("./src/model/associations")();

const registerRouter = require("./routes/register");
const hospitalRouter = require("./routes/hospital");
const tokenRouter = require("./routes/token");
const tiersRouter = require("./routes/tiers");

app.use("/api/register", registerRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/token", tokenRouter);
app.use("/api/tiers", tiersRouter);

const port = 3000;
app.listen(port, function (req, res) {
  console.log("Application running on http://localhost:" + port);
});
