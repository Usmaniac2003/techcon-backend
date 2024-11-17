const mongoose = require('mongoose');
const { Schema } = mongoose;

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, ''); 
};

const TypeSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String }
}, {
    timestamps: true
});

TypeSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

TypeSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = generateSlug(update.name);
  }
  next();
});


module.exports = mongoose.model('Type', TypeSchema);
