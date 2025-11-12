const express = require("express");
// const paginate = require("../middlewares/paginate");

const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router.post("/sub-categories", createSubCategoryValidator, createSubCategory);
router.get("/sub-categories", getAllSubCategories);
router.get("/sub-categories/:id", getSubCategoryValidator, getSubCategoryById);
router.put("/sub-categories/:id",updateSubCategoryValidator, updateSubCategory);
router.delete("/sub-categories/:id", deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
