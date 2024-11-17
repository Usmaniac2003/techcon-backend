const slugify = require("slugify");
const Country = require("../../model/Locations/country");
const City = require("../../model/Locations/city");
const Currency = require("../../model/schema/currency");

const displayCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.status(200).json({ currencies });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createCurrency = async (req, res) => {
  try {
    // Generate slug based on the category name from the request
    const slug = slugify(req.body.name, { lower: true, strict: true });

    // Create a new category with both category and slug fields
    const currency = new Currency({ ...req.body, slug });

    await currency.save(); // Save the category document
    res.status(201).json({ currency }); // Send success response
  } catch (error) {
    res.status(500).json({ error }); // Handle and send error response
  }
};

const editCurrency = async (req, res) => {
  try {
    const { name } = req.body;
    const currencyId = req.params.id;

    // Prepare the update fields
    const updateFields = {};

    if (name) {
      updateFields.name = name;
      updateFields.slug = slugify(name, { lower: true, strict: true });
    }

    // Update the category document
    const result = await Currency.findByIdAndUpdate(
      currencyId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the category was found and updated
    if (!result) {
      return res.status(404).json({ message: "Currency not found" });
    }

    res.status(200).json({ currency: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  displayCurrencies, 
  editCurrency, 
  createCurrency
};
