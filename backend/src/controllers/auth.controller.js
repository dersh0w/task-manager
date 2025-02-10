require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already in use!",
      });
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
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect credentials!",
      });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect credentials!",
      });
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
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
