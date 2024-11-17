const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, default: null },
  cityId: {type: mongoose.Schema.ObjectId, ref: "City"},
  city: { type: String, required: true}, 
  country: {type: String, required: true}, 
  image: {type: String, default: ""}, 
  applicableServices: [{
    type: String, 
    default: ""
  }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema, 'Coupon');