const { validationResult } = require("express-validator");
const Task = require("../models/task.model");
const logger = require("../utils/logger");

//FIX: corrigir o "updated_ad" / "updatedAt" na criação de uma nova task
exports.addTask = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
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
    if (newTask.updatedAt === null) {
      newTask.updatedAt = undefined;
    }

    res.status(201).json({
      status: "success",
      message: "Task created successfully!",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    logger.error("Error adding task:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    // Get user id from request
    const userId = req.user.id;

    // Get all tasks of the user
    const allTasks = await Task.findAll({ where: { user_id: userId } });

    const tasks = allTasks.map((obj) => ({
      ...obj.dataValues,
      user_id: undefined,
      updatedAt: obj.updatedAt === null ? undefined : obj.updatedAt,
    }));

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    logger.error("Error getting tasks:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    // Get user id from request
    const userId = req.user.id;

    // Get task id from request
    const taskId = req.params.id;

    if (
      !Number.isInteger(Number(userId)) ||
      !Number.isInteger(Number(taskId))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid parameters!",
      });
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
      return res.status(400).json({
        status: "fail",
        message: "Task not found!",
      });
    }

    task.user_id = undefined;
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    logger.error("Error getting task:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    // Get user id from request
    const userId = req.user.id;

    // Get task id from request
    const taskId = req.params.id;

    if (
      !Number.isInteger(Number(userId)) ||
      !Number.isInteger(Number(taskId))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid parameters!",
      });
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
      return res.status(400).json({
        status: "fail",
        message: "Task not found!",
      });
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
  } catch (error) {
    logger.error("Error updating task:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Get user id from request
    const userId = req.user.id;

    // Get task id from request
    const taskId = req.params.id;

    if (
      !Number.isInteger(Number(userId)) ||
      !Number.isInteger(Number(taskId))
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid parameters!",
      });
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
      return res.status(400).json({
        status: "fail",
        message: "Task not found!",
      });
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
  } catch (error) {
    logger.error("Error deleting task:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
