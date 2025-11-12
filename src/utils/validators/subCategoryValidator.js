const { check } = require("express-validator");
const validatorMiddlewareHandler = require("../../middlewares/validatorMiddleware.js");

/// @desc    Validator for creating a new SubCategory
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters long"),
  check("categoryId")
    .notEmpty()
    .withMessage("SubCategory must belong to a category.")
    .isMongoId()
    .withMessage("Invalid Category ID format"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for getting category by ID
exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for updating SubCategory by ID
exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
  validatorMiddlewareHandler,
];

/// @desc    Validator for deleting SubCategory by ID
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory ID format"),
  validatorMiddlewareHandler,
];
