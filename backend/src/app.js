const express = require("express");
const app = express();
require("./utils/testConnection");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working!",
  });
});

module.exports = app;
