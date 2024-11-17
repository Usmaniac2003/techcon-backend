const express = require("express");
const stripe = require("./stripe");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.post("/create-payment-intent", stripe.createPaymentIntent); 

module.exports = router;
