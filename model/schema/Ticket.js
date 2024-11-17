const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true }, // Link to the event
    description: { type: String, required: true }, // e.g., Premium, VIP, Backstage Pass
    price: { type: Number, required: true }, // Ticket price in the respective currency
    quantity_available: { type: Number, required: true }, // Number of tickets available for sale
    min_purchase: { type: Number, default: 1 }, // Minimum tickets a user can buy
    max_purchase: { type: Number, default: 10 }, // Maximum tickets a user can buy
    is_sold_out: { type: Boolean, default: false }, // Whether the ticket is sold out
    date: { type: Date, required: true }, // Date of the event/ticket availability
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", TicketSchema);
