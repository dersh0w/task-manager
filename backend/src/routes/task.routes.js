const express = require("express");
const { check } = require("express-validator");
const {
  getTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

//TODO: Separar validação das rotas em arquivo separado
taskRouter
  .route("/")
  .get(getTasks)
  .post(
    [
      check("title")
        .isString()
        .withMessage("Title must be a string")
        .not()
        .isEmpty()
        .withMessage("Title is required"),
      check("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
      check("status")
        .isString()
        .withMessage("Status must be a string")
        .isIn(["pendente", "em progresso", "concluída"])
        .withMessage(
          "Status must be one of: 'pendente', 'em progresso', 'concluída'"
        ),
    ],
    addTask
  );
taskRouter
  .route("/:id")
  .get(getTask)
  .put(
    [
      check("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
      check("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
      check("status")
        .optional()
        .isString()
        .withMessage("Status must be a string")
        .isIn(["pendente", "em progresso", "concluída"])
        .withMessage(
          "Status must be one of: 'pendente', 'em progresso', 'concluída'"
        ),
    ],
    updateTask
  )
  .delete(deleteTask);

module.exports = taskRouter;
