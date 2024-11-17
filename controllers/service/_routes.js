const express = require("express");
const service = require("./service");
const userServices = require("./userServices");
const auth = require("../../middelwares/auth");
const router = express.Router();

router.get("/display-categories", service.displaycategories);
router.post("/create-category", service.createcategory);
router.post("/create-categories", service.createCategories);
router.get("/get-services/:categoryId", service.getservices);
router.get("/get-services", service.getservicesList);
router.get("/search-services", service.searchServices);
router.post("/create-service/:categoryId", service.createservice);
router.post("/create-services/:categoryId", service.createServices);
router.post("/enable-service/:serviceId", service.enableService);
router.get("/get-types/:serviceId", service.gettypes);
router.post("/create-type/:serviceId", service.createtype);
router.get("/get-options/:typeId", service.getoptions);
router.post("/create-option/:typeId", service.createoption);
// Edit routes
router.post("/edit-category",service.editcategory);
router.post("/edit-service",service.editservice);
router.post("/edit-type",service.edittype);
router.post("/edit-option",service.editoption);


// user side routes
router.get("/browse-api", userServices.browseServices);
router.get("/service-detail/:slug", userServices.getServiceDetail);
router.get("/categories", userServices.getCategories);
module.exports = router;
