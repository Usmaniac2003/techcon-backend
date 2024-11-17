const mongoose = require("mongoose");
const { slugify } = require("slugify");

// Define the service schema
const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    required: true,
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
serviceSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name + " " + this.city, { lower: true, strict: true });
  }
  next();
});

// Create the model
const Service = mongoose.model("Service", serviceSchema, "Service");

module.exports = Service;
