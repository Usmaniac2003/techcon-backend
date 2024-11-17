const Type = require("../../model/schema/Type");
const Event = require("../../model/schema/Event");
const Ticket = require("../../model/schema/Ticket");

const getAllTypes = async (req, res) => {
  try {
    const types = await Type.find({});
    res.status(200).json({
      success: true,
      data: types,
      message: 'Types fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching types',
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const query = req.query; 
    const events = await Event.find({...query});
    res.status(200).json({
      success: true,
      data: events,
      message: 'Events fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    
    const query = req.query; 
    const tickets = await Ticket.find({...query});
    res.status(200).json({
      success: true,
      data: tickets,
      message: 'Tickets fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tickets',
    });
  }
};

module.exports = {
  getAllTypes, 
  getAllEvents, 
  getAllTickets
};
