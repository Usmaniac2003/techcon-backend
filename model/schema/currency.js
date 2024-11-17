const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the category schema with a slug field and timestamps
const currencySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Pre-save hook to generate slug based on the category name
currencySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Currency = mongoose.model("Currency", currencySchema, "Currency");

module.exports = Currency;
