const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please provide a sub-category name"],
      trim: true,
      minlength: [2, "Sub-category name must be at least 2 characters."],
      maxlength: [32, "Sub-category name must not exceed 32 characters."],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "Sub-category must belong to a category."],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategoryModel;
