const express = require("express");
const {
  getCategoryValidator,
  updateCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator.js");

const {
  createCategory,
  getCategories,
  updateCategory,
  getCategoryById,
  deleteCategoryById,
} = require("../services/categoryService.js");

const router = express.Router();

/// Category Routes
router.post("/create-category", createCategoryValidator, createCategory);
router.put("/update-category/:id", updateCategoryValidator, updateCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryValidator, getCategoryById);
router.delete(
  "/delete-category/:id",
  deleteCategoryValidator,
  deleteCategoryById
);

module.exports = router;
