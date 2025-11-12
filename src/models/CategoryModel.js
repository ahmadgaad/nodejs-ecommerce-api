const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name must not exceed 50 characters"],
      minlength: [3, "Category name must be at leaste 3 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Category description must not exceed 200 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// // 🔗 Virtual relation: Category._id -> SubCategory.category
// categorySchema.virtual("subcategories", {
//   ref: "SubCategory",
//   localField: "_id",
//   foreignField: "category",
//   justOne: false,
// });

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
