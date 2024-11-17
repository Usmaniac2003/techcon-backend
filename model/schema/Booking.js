const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event', // Reference to the Event schema
      required: true,
    },
    tickets: {
        type: Object
    },
    total_price: {
      type: Number,
      required: true, // Total amount for the booking
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'], // Booking status
      default: 'pending',
    },
    payment: {
      method: { type: String, required: true }, // Payment method (e.g., card, UPI, etc.)
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
