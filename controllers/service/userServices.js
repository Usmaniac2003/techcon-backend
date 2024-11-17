const Category = require("../../model/Service/category");
const Service = require("../../model/Service/service");
const Type = require("../../model/Service/type");
const Option = require("../../model/Service/option");
const slugify = require("slugify");

const browseServices = async (req, res) => {
  try {
    const city = req.query?.city?.trim();
    const countryVal = req.query?.country?.trim();
    const country =
      countryVal && countryVal !== "null"
        ? countryVal?.toString()?.toLowerCase()?.replaceAll(" ", "-")
        : "";

    let result = [];
    if (city && city !== "null") {
      const categories = await Category.find({
        cityId: city,
      });
      for (const category of categories) {
        const services = await Service.find({
          categoryId: category._id,
          enabled: true,
          cityId: city,
        }).populate({
          path: "cityId",
          select: "name",
        });
        result.push({
          id: category._id,
          title: category.category,
          slug: category.slug,
          services: services.map((service) => ({
            id: service._id,
            title: service.service,
            image: service.image,
            categoryId: service.categoryId,
            enabled: service.enabled,
            slug: service.slug,
          })),
        });
      }
    } else {
      const uniqueServices = await Service.distinct("service");

      const extraField = {};
      if (country) {
        extraField["country"] = country;
      }

      console.log(country, extraField)

      const groupedServices = await Service.aggregate([
        {
          $match: {
            service: { $in: uniqueServices },
            enabled: true,
            ...extraField,
          },
        },
        // Step 3: Lookup to join the City collection by cityId
        {
          $lookup: {
            from: "City", // Collection name of City
            localField: "cityId",
            foreignField: "_id",
            as: "cityData",
          },
        },
        // Step 4: Unwind the cityData array (because lookup returns an array)
        {
          $unwind: "$cityData",
        },
        // Step 5: Group by service and city name, and also collect the service's image
        {
          $group: {
            _id: {
              service: "$service",
              city: "$cityData.name",
              image: "$image",
            }, // Include image in _id
            services: { $push: "$$ROOT" },
          },
        },
        // Step 6: Group by service name and include image and cities
        {
          $group: {
            _id: { service: "$_id.service", image: "$_id.image" }, // Include the image in the outer group
            cities: {
              $push: {
                city: "$_id.city",
                services: "$services",
              },
            },
          },
        },
      ]);

      result = groupedServices;
    }
    res.status(200).json(result);
  } catch (error) {
    console.log("hm:::", error);
    res.status(500).json({ error });
  }
};

const getServiceDetail = async (req, res) => {
  try {
    const { slug } = req.params; // Getting the service by its name

    // Find the service by name
    const service = await Service.findOne({ slug: slug }).lean();

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Find all types (referred to as details in your dataset) associated with the service
    const types = await Type.find({ serviceId: service._id }).lean();

    // Find all options associated with each type
    const detailsWithOptions = await Promise.all(
      types.map(async (type) => {
        const options = await Option.find({ typeId: type._id }).lean();
        return {
          id: type._id,
          name: type.type, // Corresponding to "name" in your dataset
          slug: type.slug, // Matching "slug"
          options: options.map((option) => ({
            id: option._id,
            title: option.name, // "name" in Option is mapped to "title"
            description: option.shortdescription, // "shortdescription" maps to "description"
            content: option.Longdescription, // "Longdescription" maps to "content"
            price: (
              (option.price || 0) -
              (option.price || 0) * ((option.discount || 0) / 100)
            ).toFixed(2), // Corresponds directly
            original_price: option.price, // Assuming this formula for original price
            image_url: option.Image, // "Image" maps to "image_url"
            slug: option.slug, // Matching "slug"
          })),
        };
      })
    );

    // Combine service with its details and options
    const serviceDetail = {
      id: service._id,
      title: service.service, // "service" name is mapped to "title"
      slug: service.slug, // Matching "slug"
      image: service.image, // "image" in your dataset
      enabled: service.enabled, // Direct mapping
      category_id: service.categoryId, // Direct mapping, assuming this is the category_id in the dataset
      details: detailsWithOptions, // These are the "types" but referred to as "details"
    };

    res.status(200).json(serviceDetail);
  } catch (error) {
    console.error("Error fetching service details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const city = req.query?.city?.trim();
    if (city && city !== "null") {
      const categories = await Category.find({ cityId: city }).limit(7);
      res.status(200).json({ categories });
    } else {
      res.status(200).json({ categories: [] });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { browseServices, getServiceDetail, getCategories };
