const express = require("express");
const {
  validateAddTAsk,
  validateUpdateTask,
} = require("../utils/routeValidator");
const {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

taskRouter.route("/").get(getTasks).post(validateAddTAsk(), addTask);
taskRouter
  .route("/:id")
  .get(getTask)
  .put(validateUpdateTask(), updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
