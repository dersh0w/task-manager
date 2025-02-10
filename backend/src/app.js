const express = require("express");
const app = express();
require("./utils/testConnection");
const authRouter = require("./routes/auth.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working!",
  });
});

app.use("/api", authRouter);

module.exports = app;
