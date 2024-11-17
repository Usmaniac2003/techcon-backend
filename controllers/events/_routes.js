const express = require("express");
const events = require("./events.js");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.use(auth); 

router.get("/types" , events.getAllTypes);
router.get("/tickets" , events.getAllTickets);
router.get("/cities" , events.getAllCities);
router.post("/book" , events.book);
router.get("/search" , events.search);
router.get("/bookings/:id" , events.getBookings);
router.get("/" , events.getAllEvents);

module.exports = router;
