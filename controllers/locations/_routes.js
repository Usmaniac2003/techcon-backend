const express = require("express");
const locations = require("./locations");
const auth = require("../../middelwares/auth");
const router = express.Router();

router.get("/countries", locations.displayCountries)
router.get("/cities", locations.displayCities)
router.get("/cities/:countryId", locations.displayCitiesByCountry)

router.get('/countries/:slug', locations.getCountryBySlug); 

router.post("/countries", locations.createCountry); 
router.post("/cities", locations.createCity); 

router.post("/countries/:id", locations.editCountry); 
router.post("/cities/:id", locations.editCity); 

module.exports = router;
