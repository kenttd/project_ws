const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const Associations = require("./src/model/associations")();

const registerRouter = require("./routes/register");

app.use("/api/register", registerRouter);
// A simple get greet method
app.get("/greet", (req, res) => {
  // get the passed query
  const { name } = req.query;
  res.send({ msg: `Welcome ${name || "kent"}!` });
});

const port = 3000;
app.listen(port, function (req, res) {
  console.log("Application running on http://localhost:" + port);
});
