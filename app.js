const express = require("express");
const apiRouter = require("./routes/api.router");
const errorController = require("./controllers/error.controller");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  // catch everything else with 404
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, _, res, next) => {
  if (err) {
    errorController.handleErrors(res, err);
  } else next(err);
});

module.exports = app;
