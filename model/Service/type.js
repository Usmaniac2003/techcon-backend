const mongoose = require("mongoose");
const slugify = require("slugify");

// Define the schema for Type
const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cityId: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    required: true
  },
});

// Middleware to generate slug before saving
typeSchema.pre("save", function (next) {
  if (this.isModified("type") || this.isNew) {
    this.slug = slugify(this.type + " " + this.city, {
      lower: true,
      strict: true,
    });
  }
  next();
});

// Create the model
const Type = mongoose.model("Type", typeSchema, "Type");

module.exports = Type;
