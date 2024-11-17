const mongoose = require('mongoose');
const { Schema } = mongoose;

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

const EventSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
  note: { type: String },
  image: { type: String },
  venue: { type: String, required: true },
  meta_keywords: { type: String },
  date: { type: String, required: true },
  active: { type: Boolean, default: true },
  map_url: { type: String, default: null },
  images: [String],
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
}, {
    timestamps: true
});

EventSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

module.exports = mongoose.model('Event', EventSchema);
