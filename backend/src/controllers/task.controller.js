const { validationResult } = require("express-validator");
const Task = require("../models/task.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const logger = require("../utils/logger");

//FIX: corrigir o "updated_ad" / "updatedAt" na criação de uma nova task
exports.addTask = catchAsync(async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors: " + errors);
    throw errors;
  }

  // Get user id from request
  const userId = req.user.id;

  // Get data from request
  const { title, description, status } = req.body;

  // Create new task
  const newTask = await Task.create({
    user_id: userId,
    title,
    description,
    status,
  });

  newTask.user_id = undefined;
  res.status(201).json({
    status: "success",
    message: "Task created successfully!",
    data: {
      task: newTask,
    },
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  // Get user id from request
  const userId = req.user.id;

  // Get all tasks of the user
  const allTasks = await Task.findAll({ where: { user_id: userId } });

  const tasks = allTasks.map((obj) => ({
    ...obj.dataValues,
    user_id: undefined,
  }));

  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  // Get and validate user id and task id
  const userId = req.user.id;
  const taskId = req.params.id;

  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(taskId))) {
    return next(new AppError("Invalid parameters!", 400));
  }

  // Get task
  const task = await Task.findOne({
    where: {
      id: taskId,
      user_id: userId,
    },
  });

  // Task not found
  if (!task) {
    return next(new AppError("Task not found!", 400));
  }

  task.user_id = undefined;
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors: " + errors);
    throw errors;
  }

  // Get and validate user id and task id
  const userId = req.user.id;
  const taskId = req.params.id;

  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(taskId))) {
    return next(new AppError("Invalid parameters!", 400));
  }

  // Get updated data from request
  const { title, description, status } = req.body;

  // Get task
  const task = await Task.findOne({
    where: {
      id: taskId,
      user_id: userId,
    },
  });

  // Task not found
  if (!task) {
    return next(new AppError("Task not found!", 400));
  }

  // Update task
  await Task.update(
    { title, description, status },
    {
      where: {
        id: taskId,
        user_id: userId,
      },
    }
  );

  const updatedTask = await Task.findOne({
    where: {
      id: taskId,
      user_id: userId,
    },
  });
  updatedTask.user_id = undefined;
  res.status(204).json({
    status: "success",
    message: "Task updated successfully!",
    data: {
      task: updatedTask,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  // Get and validate user id and task id
  const userId = req.user.id;
  const taskId = req.params.id;

  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(taskId))) {
    return next(new AppError("Invalid parameters!", 400));
  }

  // Get task
  const task = await Task.findOne({
    where: {
      id: taskId,
      user_id: userId,
    },
  });

  // Task not found
  if (!task) {
    return next(new AppError("Task not found!", 400));
  }

  // Delete task
  await Task.destroy({
    where: {
      id: taskId,
      user_id: userId,
    },
  });

  res.status(203).json({
    status: "success",
    message: "Task deleted successfully!",
  });
});
