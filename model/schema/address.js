const mongoose = require("mongoose");

// create login schema
const address = new mongoose.Schema(
  {
    latlng: {
      type: String, 
      required: true
    }, 
    formattedAddress: {
      type: String, 
      required: true
    }, 
    user: {
      type: mongoose.Schema.ObjectId, 
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", address, "Address");
