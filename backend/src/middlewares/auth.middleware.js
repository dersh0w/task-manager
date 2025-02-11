const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectRoute = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Token Not Found!",
    });
  }

  let decodedToken;
  try {
    decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid Token!",
    });
  }

  const user = await User.findOne({ where: { id: decodedToken.id } });

  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid Token!",
    });
  }

  req.user = user;
  next();
};
