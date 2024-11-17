const express = require("express");
const router = express.Router();

const userRoute = require("./user/_routes");
const eventsRouter = require("./events/_routes");

router.use("/user", userRoute);
router.use("/events", eventsRouter);

module.exports = router;
