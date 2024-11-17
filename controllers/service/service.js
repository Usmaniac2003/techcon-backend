const Category = require("../../model/Service/category");
const Service = require("../../model/Service/service");
const Type = require("../../model/Service/type");
const Option = require("../../model/Service/option");
const slugify = require("slugify");

const displaycategories = async (req, res) => {
  try {
    const city = req.query?.city; 
    const categories = await Category.find(city ? {city} : {});
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createcategory = async (req, res) => {
  try {
    // Generate slug based on the category name from the request
    const slug = slugify(req.body.category + " " + req.body.city, { lower: true, strict: true });

    // Create a new category with both category and slug fields
    const category = new Category({ ...req.body, slug });

    await category.save(); // Save the category document
    res.status(201).json({ category }); // Send success response
  } catch (error) {
    res.status(500).json({ error }); // Handle and send error response
  }
};
const createCategories = async (req, res) => {
  try {
    // Prepare categories with slugs

    const categories = req.body.map(category => ({
      ...category,
      slug: slugify(category.category, { lower: true, strict: true })
    }));

    // Insert multiple categories using insertMany
    const insertedCategories = await Category.insertMany(categories);

    res.status(201).json({ categories: insertedCategories }); // Send success response with inserted categories
  } catch (error) {
    console.log(error)
    res.status(500).json({ error }); // Handle and send error response
  }
};
const getservices = async (req, res) => {
  try {
    const city = req.query?.city; 
    const filters = { categoryId: req.params.categoryId}; 
    if(city) {
      filters["city"] = city; 
    }
    const services = await Service.find(filters);
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getservicesList = async (req, res) => {
  try {
    const city = req.query?.city; 
    const filters = {}; 
    if(city) {
      filters["city"] = city; 
    }
    const services = await Service.find(filters);
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createservice = async (req, res) => {
  try {
    // Generate the slug
    const slug = slugify(req.body.service + " " + req.body.city, { lower: true, strict: true });

    // Create a new service object
    const service = new Service({
      service: req.body.service,
      image: req.body.image,
      categoryId: req.body.categoryId,
      city: req.body.city, 
      cityId: req.body.cityId,
      country: req.body.country,
      slug: slug,
    });

    // Save the service to the database
    await service.save();
    res.status(201).json({ service });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createServices = async (req, res) => {
  try {
    // Prepare an array of service objects with slugs
    const services = req.body.map(service => ({
      service: service.service,
      image: service.image,
      categoryId: service.categoryId,
      slug: slugify(service.service, { lower: true, strict: true }),
    }));

    // Insert multiple services using insertMany
    const insertedServices = await Service.insertMany(services);

    res.status(201).json({ services: insertedServices }); // Send success response with inserted services
  } catch (error) {
    res.status(500).json({ error }); // Handle and send error response
  }
};

const enableService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    service.enabled = !service.enabled;
    await service.save();
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const gettypes = async (req, res) => {
  try {
    const city = req.query?.city; 
    const filters = { serviceId: req.params.serviceId }; 
    if(city) {
      filters["city"] = city; 
    }
    const types = await Type.find(filters);
    res.status(200).json({ types });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createtype = async (req, res) => {
  try {
    const typeData = req.body;

    // Create a new Type instance with req.body
    const type = new Type(typeData);

    // Save the Type instance to the database
    await type.save();

    // Respond with the created type
    res.status(201).json({ type });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const getoptions = async (req, res) => {
  try {
    const city = req.query?.city; 
    const filters = { typeId: req.params.typeId }; 
    if(city) {
      filters["city"] = city; 
    }
    const options = await Option.find(filters);
    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const searchServices = async (req, res) => {
  try {
    const city = req.query?.city?.trim(); 
    const services = await Service.find(city !== "null" ? {cityId: city} : {}).populate({path: "cityId"});
    res.status(200).json({ data: services });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createoption = async (req, res) => {
  try {
    const option = new Option(req.body);
    await option.save();
    res.status(201).json({ option });
  } catch (error) {
    res.status(500).json({ error: "Failed to create option" });
  }
};

const editcategory = async (req, res) => {
  try {
    const { categoryId, category, city } = req.body;

    // Prepare the update fields
    const updateFields = {};

    if (category) {
      updateFields.category = category;
      updateFields.slug = slugify(category + " " + city, { lower: true, strict: true });
    }

    // Update the category document
    const result = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the category was found and updated
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ category: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const editservice = async (req, res) => {
  try {
    // Extract fields from request body
    const { serviceId, service, image, city } = req.body;

    // Construct the update object
    const updateFields = {};

    // Only set fields if they are provided
    if (service) {
      updateFields.service = service;
      updateFields.slug = slugify(service + " " + city, { lower: true, strict: true });
    }
    if (image) {
      updateFields.image = image;
    }

    // Perform the update operation
    const result = await Service.findByIdAndUpdate(
      serviceId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the service was found and updated
    if (!result) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ service: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const edittype = async (req, res) => {
  try {
    const { typeId, type, city } = req.body;

    // Prepare the update fields
    const updateFields = {};

    if (type) {
      updateFields.type = type;
      updateFields.slug = slugify(type + " " + city, { lower: true, strict: true });
    }

    // Update the type document
    const result = await Type.findByIdAndUpdate(
      typeId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the type was found and updated
    if (!result) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.status(200).json({ type: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const editoption = async (req, res) => {
  try {
    const { optionId, city, option, ...rest } = req.body;

    // Prepare the update fields
    const updateFields = {};

    if (option) {
      updateFields.option = option;
      updateFields.slug = slugify(option + " " + city, { lower: true, strict: true });
    }

    // Add any other fields that might be in the request body
    Object.keys(rest).forEach((key) => {
      updateFields[key] = rest[key];
    });

    // Update the option document
    const result = await Option.findByIdAndUpdate(
      optionId,
      { $set: updateFields },
      { new: true }
    );

    // Check if the option was found and updated
    if (!result) {
      return res.status(404).json({ message: "Option not found" });
    }

    res.status(200).json({ option: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  displaycategories,
  createcategory,
  getservices,
  createservice,
  gettypes,
  createtype,
  getoptions,
  createoption,
  createServices,
  enableService,
  editcategory,
  editservice,
  edittype,
  editoption,
  searchServices,
  getservicesList,
  createCategories
};
