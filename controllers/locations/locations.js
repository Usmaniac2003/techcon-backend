const slugify = require("slugify");
const Country = require("../../model/Locations/country");
const City = require("../../model/Locations/city");

const displayCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).populate({
      path: "currency"
    }).exec(); 
    res.status(200).json({ countries });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getCountryBySlug = async (req, res) => {
  try {
    const country = await Country.findOne({slug: req.params.slug}).populate({
      path: "currency"
    }).exec(); 
    res.status(200).json({ country });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createCountry = async (req, res) => {
  try {
    // Generate slug based on the category name from the request
    const slug = slugify(req.body.name, { lower: true, strict: true });

    // Create a new category with both category and slug fields
    const country = new Country({ ...req.body, slug });

    await country.save(); // Save the category document
    res.status(201).json({ country }); // Send success response
  } catch (error) {
    res.status(500).json({ error }); // Handle and send error response
  }
};

const editCountry = async (req, res) => {
  try {
    const { name, currency } = req.body;
    const countryId = req.params.id;

    // Prepare the update fields
    const updateFields = {};

    if (name) {
      updateFields.name = name;
      updateFields.slug = slugify(name, { lower: true, strict: true });
    }
      updateFields.currency = currency;

    // Update the category document
    const result = await Country.findByIdAndUpdate(
      countryId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the category was found and updated
    if (!result) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({ country: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const displayCities = async (req, res) => {
  try {

    const cities = await City.find({...req.query});
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ error });
  }
};


const displayCitiesByCountry = async (req, res) => {
  try {
    const cities = await City.find({country: req.params.countryId});
    res.status(200).json({ cities });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createCity = async (req, res) => {
  try {
    // Generate slug based on the category name from the request
    const slug = slugify(req.body.name, { lower: true, strict: true });

    // Create a new category with both category and slug fields
    const city = new City({ ...req.body, slug });

    await city.save(); // Save the category document
    res.status(201).json({ city }); // Send success response
  } catch (error) {
    res.status(500).json({ error }); // Handle and send error response
  }
};

const editCity = async (req, res) => {
  try {
    const { name } = req.body;
    const cityId = req.params.id;

    // Prepare the update fields
    const updateFields = {};

    if (name) {
      updateFields.name = name;
      updateFields.slug = slugify(name, { lower: true, strict: true });
    }

    // Update the category document
    const result = await City.findByIdAndUpdate(
      cityId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the category was found and updated
    if (!result) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ city: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  displayCities,
  displayCountries,
  editCity,
  editCountry,
  createCountry,
  getCountryBySlug,
  createCity,
  displayCitiesByCountry
};
