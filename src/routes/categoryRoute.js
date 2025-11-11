const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  getCategoryById,
  deleteCategoryById
} = require("../services/categoryService.js");

const router = express.Router();

/// Category Routes
router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/delete-category/:id", deleteCategoryById);

module.exports = router;
