const express = require("express");
const feedback = require("./feedback");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.get("/", feedback.index); 
router.post("/", feedback.create);
router.post("/:id", feedback.edit); 

module.exports = router;
