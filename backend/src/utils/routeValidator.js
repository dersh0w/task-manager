const { check } = require("express-validator");

exports.validateRegister = (req, res, next) => {
  return [
    check("name", "Name is required").isString().not().isEmpty(),
    check("email", "Valid email is required").isString().isEmail(),
    check("password", "Password must be at least 8 characters")
      .isString()
      .isLength({
        min: 8,
      }),
  ];
};

exports.validateLogin = (req, res, next) => {
  return [
    check("email", "Valid email is required").isEmail().not().isEmpty(),
    check("password", "Password is required").not().isEmpty().isString(),
  ];
};

exports.validateAddTAsk = (req, res, next) => {
  return [
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
  ];
};

exports.validateUpdateTask = (req, res, next) => {
  return [
    check("title").optional().isString().withMessage("Title must be a string"),
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
  ];
};
