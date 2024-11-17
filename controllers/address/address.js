const Address = require("../../model/schema/address");

const index = async (req, res) => {
  try {
    const query = req.query;
    const addresses = await Address.find(query); 

    res.status(200).json({
      status: true,
      data: addresses,
    });
  } catch (err) {
    console.error("Failed to create address:", err);
    res.status(400).json({ error: "Failed to create address" });
  }
};


const create = async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    await newAddress.save();

    res.status(200).json({
      status: true,
      message: "address created",
    });
  } catch (err) {
    console.error("Failed to create address:", err);
    res.status(400).json({ error: "Failed to create address" });
  }
};

module.exports = {
  index,
  create,};
