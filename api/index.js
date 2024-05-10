const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const Associations = require("./src/model/associations")();

const registerRouter = require("./routes/register");
const hospitalRouter = require("./routes/hospital");

app.use("/api/register", registerRouter);
app.use("/api/hospital", hospitalRouter);

const port = 3000;
app.listen(port, function (req, res) {
  console.log("Application running on http://localhosta:" + port);
});
