const Lead = require("../../model/schema/lead");
const User = require("../../model/schema/user");

const index = async (req, res) => {
  try {
    const dateTime = req.query?.dateTime?.split("|");
    const isDateTime = dateTime?.some((d) => d);

    const q = {};

    // DateTime range filter
    if (isDateTime && dateTime[0]) {
      const from = new Date(dateTime[0]);

      q["dateAndTime.date"] = { $gte: from };
    }
    if (isDateTime && dateTime[1]) {
      const to = new Date(dateTime[1]).toISOString();
      if (q["dateAndTime.date"]) {
        q["dateAndTime.date"].$lte = to;
      }
    }
    let data = await Lead.find(q)
      .populate({
        path: "customer",
      })
      .sort("-createdAt")
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getByCustomer = async (req, res) => {
  try {
    let data = await Lead.find({ customer: req.params.customerId })
      .populate({
        path: "coupon",
      }).sort("-createdAt")
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const view = async (req, res) => {
  try {
    const id = req.params.id;

    let data = await Lead.findById(id)
      .populate({
        path: "customer",
      })
      .populate({
        path: "coupon",
      })
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;

    await Lead.findByIdAndUpdate(id, req.body); 

    res.status(200).json({
      status: true, 
      message: "Lead status updated"
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const create = async (req, res) => {
  try {
    const body = req.body;

    const newLead = new Lead(body);
    const response = await newLead.save();

    const totalAmount = body.price?.total || 0; 

    // For every 25 AED, customer earns 100 credits
    const totalCredits = Math.floor((totalAmount / 25) * 100); 

    const updatedUser = await User.findByIdAndUpdate(body.customer, {
      lastBooking: response._id?.toString(),
      $inc: {credits: totalCredits}
    }, {new:true});

    res.status(200).json({response, credits: updatedUser.credits});
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  index,
  create,
  view,
  getByCustomer,
  edit
};
