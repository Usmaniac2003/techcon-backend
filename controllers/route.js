const express = require("express");
const router = express.Router();

const userRoute = require("./user/_routes");

router.use("/user", userRoute);

module.exports = router;
