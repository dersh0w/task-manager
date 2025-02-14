const express = require("express");
const cors = require("cors");
require("./utils/testConnection");
const morganMiddleware = require("./middlewares/morgan");
const authRouter = require("./routes/auth.routes");
const { protectRoute } = require("./middlewares/auth.middleware");
const taskRouter = require("./routes/task.routes");
const globalErrorHandler = require("./controllers/error.controller");
const app = express();

//TODO: Otimizar controllers, models e routers
app.use(express.json());
app.use(morganMiddleware);
app.use(cors()); // Pro front conseguir se comunicar!

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working!",
  });
});

app.use("/api", authRouter);
app.use("/api/tasks", protectRoute, taskRouter);

app.use(globalErrorHandler);

module.exports = app;
