const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the category schema with a slug field and timestamps
const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String, 
    required: true, 
  }, 
  cityId: {
    type: mongoose.Schema.ObjectId, 
    ref: "City", 
    required: true
  }, 
  city: {
    type: String, 
    required: true, 
  }, 
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Pre-save hook to generate slug based on the category name
categorySchema.pre("save", function (next) {
  if (this.isModified("category")) {
    this.slug = slugify(this.category + " " + this.city, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema, "Category");

module.exports = Category;
