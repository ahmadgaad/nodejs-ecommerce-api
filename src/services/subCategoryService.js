const slugify = require("slugify");
const SubCategoryModel = require("../models/SubCategoryModel");
const CategoryModel = require("../models/CategoryModel.js");

/// @desc    Create a new sub-category
/// @route   POST /api/v1/sub-categories
/// @access  Private/Admin
exports.createSubCategory = async (req, res) => {
  const name = req.body.name;
  const categoryId = req.body.categoryId;

  if (!name) {
    return res.status(400).json({ message: "Sub-category name is required" });
  }

  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required" });
  }

  const category = await CategoryModel.findById(categoryId);
  console.log(`Category found: ${category}`);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const existingSubCategory = await SubCategoryModel.findOne({ name });
  if (existingSubCategory) {
    return res.status(400).json({
      success: false,
      message: "Sub-category already exists",
    });
  }

  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name, { lower: true }),
    category: categoryId,
  });

  return res.status(201).json({
    success: true,
    message: "Sub-category created successfully",
    subCategory,
  });
};

/// @desc    Get all sub-categories
/// @route   GET /api/v1/sub-categories
/// @access  Public
exports.getAllSubCategories = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategoryModel.find().skip(skip).limit(limit);

  return res.status(200).json({
    success: true,
    results: subCategories.length,
    message: "fetch all subscategories successfully",
    subCategories,
  });
};

/// @desc    Get sub-category by ID
/// @route   GET /api/v1/sub-categories/:id
/// @access  Public
exports.getSubCategoryById = async (req, res) => {
  const subCategoryId = req.params.id;
  const subCategory = await SubCategoryModel.findById(subCategoryId);

  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: "Sub-category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sub-category fetched successfully",
    subCategory,
  });
};

/// @desc    Update sub-category
/// @route   PUT /api/v1/sub-categories/:id
/// @access  Private/Admin
exports.updateSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;
  const updates = req.body;

  if (updates.name) {
    updates.slug = slugify(updates.name, { lower: true });
  }

  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    subCategoryId,
    updates,
    { new: true }
  );

  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: "Sub-category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sub-category updated successfully",
    subCategory,
  });
};

/// @desc    Delete sub-category
/// @route   DELETE /api/v1/sub-categories/:id
/// @access  Private/Admin
exports.deleteSubCategory = async (req, res) => {
  const subCategoryId = req.params.id;

  const subCategory = await SubCategoryModel.findByIdAndDelete(subCategoryId);

  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: "Sub-category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Sub-category deleted successfully",
  });
};
