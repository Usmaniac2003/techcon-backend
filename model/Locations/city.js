const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the category schema with a slug field and timestamps
const citySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  country: {
    type: mongoose.Schema.ObjectId, 
    ref: "Country", 
  }, 
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Pre-save hook to generate slug based on the category name
citySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const City = mongoose.model("City", citySchema, "City");

module.exports = City;
