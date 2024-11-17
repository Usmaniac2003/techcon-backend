const express = require("express");
const events = require("./events.js");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.use(auth); 

router.get("/types" , events.getAllTypes);
router.get("/tickets" , events.getAllTickets);
router.get("/" , events.getAllEvents);

module.exports = router;
