const { check } = require("express-validator");
const validatorMiddlewareHandler = require("../../middlewares/validatorMiddleware.js");

/// @desc    Validator for getting category by ID
exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for updating category by ID
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for creating a new category
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long"),
  check("description")
    .notEmpty()
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description can be up to 500 characters long"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for deleting category by ID
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format"),
  validatorMiddlewareHandler,
];