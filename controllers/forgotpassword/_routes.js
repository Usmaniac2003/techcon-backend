const express = require("express");
const forgotpassword = require("./forgotpassword");

const router = express.Router();

router.post('/forgotpassword', forgotpassword.forgot); 
router.post('/resetpassword', forgotpassword.reset); 

module.exports = router;
