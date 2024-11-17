const express = require("express");
const currency = require("./currency");
const auth = require("../../middelwares/auth");
const router = express.Router();

router.get("/", currency.displayCurrencies)
router.post("/", currency.createCurrency); 
router.post("/:id", currency.editCurrency); 

module.exports = router;
