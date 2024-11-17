const Feedback = require("../../model/schema/feedback");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
  try {
    const query = req.query; 
    const feedbacks = await Feedback.find(query)
      .populate({
        path: "user",
        select: {fullName: 1}
      })
      .exec();

    res.status(200).json({
      status: true,
      data: feedbacks,
    });
  } catch (err) {
    console.error("Failed to create feedback:", err);
    res.status(400).json({ error: "Failed to create feedback" });
  }
};

const create = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();

    res.status(200).json({
      status: true,
      message: "Feedback created",
    });
  } catch (err) {
    console.error("Failed to create feedback:", err);
    res.status(400).json({ error: "Failed to create feedback" });
  }
};

const edit = async (req, res) => {
  try {
    await Feedback.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: true,
      message: "Feedback updated",
    });
  } catch (err) {
    console.error("Failed to Update Feedback:", err);
    res.status(400).json({ error: "Failed to Update Feedback" });
  }
};

module.exports = {
  create,
  index,
  edit,
};
