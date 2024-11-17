const express = require('express');
const router = express.Router();

const userRoute = require('./user/_routes');
const leadRoute = require("./lead/_routes"); 
const feedbackRoute = require("./feedback/_routes"); 
const stripeRoute = require("./stripe/_routes"); 
const couponRoute = require("./coupon/_routes"); 
const serviceRoute = require("./service/_routes");
const locationsRoute = require("./locations/_routes");
const currencyRoute = require("./currency/_routes");
const addressRoute = require("./address/_routes");
const passwordRoute = require("./forgotpassword/_routes");

router.use('/user', userRoute);
router.use('/leads', leadRoute); 
router.use('/feedbacks', feedbackRoute); 
router.use('/coupons', couponRoute); 
router.use('/stripe', stripeRoute); 
router.use("/service", serviceRoute);
router.use("/locations", locationsRoute);
router.use("/currency", currencyRoute);
router.use("/addresses", addressRoute);
router.use("/password", passwordRoute);

module.exports = router;