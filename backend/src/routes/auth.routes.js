const express = require("express");
const { validateRegister, validateLogin } = require("../utils/routeValidator");
const { register, login } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", validateRegister(), register);

authRouter.post("/login", validateLogin(), login);

module.exports = authRouter;
