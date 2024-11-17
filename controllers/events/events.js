const Type = require("../../model/schema/Type");
const Event = require("../../model/schema/Event");
const Ticket = require("../../model/schema/Ticket");
const City = require("../../model/schema/City");
const Booking = require("../../model/schema/Booking");

const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find({});
    res.status(200).json({
      success: true,
      data: types,
      message: "Types fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching types",
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const query = req.query;
    const events = await Event.find({ ...query });
    res.status(200).json({
      success: true,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const query = req.query;
    const tickets = await Ticket.find({ ...query });
    res.status(200).json({
      success: true,
      data: tickets,
      message: "Tickets fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tickets",
    });
  }
};

const getAllCities = async (req, res) => {
  try {
    const query = req.query;
    const cities = await City.find({ ...query });
    res.status(200).json({
      success: true,
      data: cities,
      message: "Cities fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cities",
    });
  }
};

const search = async (req, res) => {
  try {
    const { name, city, date, category } = req.query; // Extract query parameters
    const filter = {};

    // Add filters dynamically
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive search for name
    }

    if (city) {
      filter.city = city; // Assuming city is stored as a name or an ID
    }

    if (date) {
      filter.date = date; // Exact date match
    }

    if (category) {
      filter.category = category; // Exact date match
    }

    const events = await Event.find(filter)
      .populate("city")
      .populate("category"); // Populate city and category details
    res.status(200).json({
      success: true,
      data: events,
      message: "Events fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
};

const book = async (req, res) => {
  try {
    const data = req.body;
    const booking = new Booking(data);
    await booking.save();
    res.status(200).json({
      success: true,

      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.find({
      user: id,
    }).populate('event').exec();
    res.status(200).json({
      success: true,
      data: bookings,

      message: "Booking fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
    });
  }
};

module.exports = {
  getAllTypes,
  getAllEvents,
  getAllTickets,
  getAllCities,
  search,
  book,
  getBookings,
};
