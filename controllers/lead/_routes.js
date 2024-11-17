const express = require("express");
const lead = require("./lead");

const router = express.Router();

router.get("/", lead.index);
router.post("/", lead.create);
router.get('/:id', lead.view); 
router.post('/:id', lead.edit); 
router.get('/getByCustomer/:customerId', lead.getByCustomer); 

module.exports = router;
