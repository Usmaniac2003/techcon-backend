const mongoose = require("mongoose");

const resettokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResetToken", resettokenSchema, "ResetToken");
