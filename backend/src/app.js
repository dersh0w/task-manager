const express = require("express");
const app = express();
require("./utils/testConnection");
const authRouter = require("./routes/auth.routes");
const { protectRoute } = require("./middlewares/auth.middleware");
const taskRouter = require("./routes/task.routes");

//TODO: Dockerizar a aplicação
//TODO: Otimizar controllers, models e routers
//TODO: Implementar validação de input e data sanitization
//TODO: Implementar error handler
//TODO: Implementar logger (winston + morgan)
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is working!",
  });
});

app.use("/api", authRouter);
app.use("/api/tasks", protectRoute, taskRouter);

module.exports = app;
