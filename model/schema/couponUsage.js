const mongoose = require("mongoose");

const couponUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  couponId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
    required: true,
  },
  usageCount: { type: Number, default: 0 },
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "CouponUsage",
  couponUsageSchema,
  "CouponUsage"
);
