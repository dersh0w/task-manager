const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    check("name", "Name is required").isString().not().isEmpty(),
    check("email", "Valid email is required").isString().isEmail(),
    check("password", "Password must be at least 8 characters")
      .isString()
      .isLength({
        min: 8,
      }),
  ],
  register
);

authRouter.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail().not().isEmpty(),
    check("password", "Password is required").not().isEmpty().isString(),
  ],
  login
);

module.exports = authRouter;
