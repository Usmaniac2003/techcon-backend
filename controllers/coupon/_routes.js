const express = require("express");
const coupon = require("./coupon");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.post("/", coupon.create)
router.get("/", coupon.index); 
router.get("/active", coupon.activeCoupons); 
router.post("/validate", coupon.validate); 

module.exports = router;
