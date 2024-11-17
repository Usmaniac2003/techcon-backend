const Coupon = require("../../model/schema/coupon");
const CouponUsage = require("../../model/schema/couponUsage");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
  try {
    const coupons = await Coupon.find({...req.query});

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const activeCoupons = async (req, res) => {
  try {
    const currentDate = new Date();
    const coupons = await Coupon.find({ expiryDate: { $gte: currentDate }, ...req.query });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    const coupon = await newCoupon.save();

    res
      .status(200)
      .json({ coupon, status: true, message: "Coupon created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const validate = async (req, res) => {
  try {
    const { code, service, userId } = req.body;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.json({ status: false, message: "Coupon not found" });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.json({ status: false, message: "Coupon has expired" });
    }

    if (
      coupon.applicableServices.length > 0 &&
      !coupon.applicableServices.includes(service)
    ) {
      return res.json({
        status: false,
        message: "Coupon not applicable for this service",
      });
    }

    // const couponUsage = await CouponUsage.findOne({
    //   userId,
    //   couponId: coupon._id,
    // });

    // if (coupon.usageLimit !== null) {
    //   if (couponUsage) {
    //     if (couponUsage.usageCount >= coupon.usageLimit) {
    //       return res.json({
    //         status: false,
    //         message: "Coupon usage limit exceeded for this user",
    //       });
    //     }
    //   } else {
    //     await CouponUsage.create({
    //       userId,
    //       couponId: coupon._id,
    //       usageCount: 0,
    //     });
    //   }
    // }

    // if (couponUsage) {
    //   couponUsage.usageCount += 1;
    //   await couponUsage.save();
    // } else {
    //   await CouponUsage.create({ userId, couponId: coupon._id, usageCount: 1 });
    // }

    res.json({ status: true, data: coupon, message: "Coupon applied" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  create,
  index,
  validate,
  activeCoupons,
};
