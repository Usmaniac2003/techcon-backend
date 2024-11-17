const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the category schema with a slug field and timestamps
const countrySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  currency: {
    type: mongoose.Schema.ObjectId, 
    ref: "Currency", 
    required: true
  }, 
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Pre-save hook to generate slug based on the category name
countrySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Country = mongoose.model("Country", countrySchema, "Country");

module.exports = Country;
