const mongoose = require('mongoose');
const { Schema } = mongoose;

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

const CitySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
}, {
    timestamps: true
});

CitySchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

module.exports = mongoose.model('City', CitySchema);
