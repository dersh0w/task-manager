const express = require("express");
const cors = require("cors");
const app = express();
require("./utils/testConnection");
const authRouter = require("./routes/auth.routes");
const { protectRoute } = require("./middlewares/auth.middleware");
const taskRouter = require("./routes/task.routes");

//TODO: Implementar error handler
//TODO: Implementar logger (winston + morgan)
//TODO: Otimizar controllers, models e routers
app.use(express.json());
app.use(cors()); // Pro front conseguir se comunicar!

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working!",
  });
});

app.use("/api", authRouter);
app.use("/api/tasks", protectRoute, taskRouter);

module.exports = app;
