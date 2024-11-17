const mongoose = require("mongoose");

const lead = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      default: "",
    },
    price: {
      type: Object,
      default: {},
      required: true,
    },
    payment: {
      type: Object,
      default: {},
    },
    addOns: {
      type: Array,
      default: [],
    },
    details: {
      type: Object,
      default: {},
      required: true,
    },
    status: {
      type: String, 
      default: "pending", 
      required: true
    },
    dateAndTime: {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
    coupon: {
      type: mongoose.Schema.ObjectId,
      ref: "Coupon",
    },
    address: {
      type: Object,
      default: {},
    },
    requirements: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", lead, "Lead");
