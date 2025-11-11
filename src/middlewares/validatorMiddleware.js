const { validationResult } = require("express-validator");


/// @desc    Middleware to handle validation results
const validatorMiddlewareHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddlewareHandler;