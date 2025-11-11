const slugify = require("slugify");
const categoryModel = require("../models/CategoryModel.js");
const mongoose = require("mongoose");

/// @desc    Get all categories
/// @route   GET /api/v1/categories
/// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;
    const categories = await categoryModel.find().skip(skip).limit(limit);
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      results: categories.length,
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

/// @desc    Get category by ID
/// @route   GET /api/v1/categories/:id
/// @access  Public
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

/// @desc    Create a new category
/// @route   POST /api/v1/categories
/// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await categoryModel.create({
      name,
      slug: slugify(name, { lower: true }),
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/// @desc    Update an existing category
/// @route   PUT /api/v1/categories/:id
/// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description, image } = req.body;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true });
    }
    if (description) category.description = description;
    if (image) category.image = image;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/// @desc    Delete a category by ID
/// @route   DELETE /api/v1/categories/:id
/// @access  Private/Admin
exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }
    const category = await categoryModel.findOneAndDelete({ _id: categoryId });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
