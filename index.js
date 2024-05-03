const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const Associations = require("./src/model/associations")();

// const questionsRouter = require("./src/routes/questions");

// app.use("/api/questions", questionsRouter);
const port = 3000;
app.listen(port, function (req, res) {
  console.log("Application running on http://localhost:" + port);
});
