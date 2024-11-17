const mongoose = require("mongoose");

const feedback = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean, 
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedback, "Feedback");
