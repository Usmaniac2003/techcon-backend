const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the schema for Option
const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  Image: {
    type: String,
    required: true,
    trim: true,
  },
  shortdescription: {
    type: String,
    required: true,
    trim: true,
  },
  Longdescription: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
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
    unique: true,
  },
  currency: {
    type: String,
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type", // Reference to the Type model
    required: true,
  },
});

// Middleware to generate slug before saving
optionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name + " " + this.city, {
      lower: true,
      strict: true,
    });
  }
  next();
});

// Create the model
const Option = mongoose.model("Option", optionSchema, "Option");

module.exports = Option;
