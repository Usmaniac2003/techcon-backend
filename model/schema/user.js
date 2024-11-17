const mongoose = require("mongoose");

// create login schema
const user = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      default: 0,
    },
    lastBooking: {
      type: mongoose.Schema.ObjectId,
      ref: "Lead",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user, "User");
