require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const logger = require("../utils/logger");

exports.register = catchAsync(async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors: " + errors);
    throw errors;
  }

  // Get user data
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError("Email already in use!", 400));
  }

  // Create new user
  const newUser = await User.create({ name, email, password });

  // Generate token
  const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully!",
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      token,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors: " + errors);
    throw errors;
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError("Incorrect credentials!", 400));
  }

  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Incorrect credentials!", 400));
  }

  // Generate token
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    message: "User login successfully!",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
});
