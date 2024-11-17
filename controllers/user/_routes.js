const express = require("express");
const user = require("./user");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.get("/:id" , user.index);
router.post("/signup", user.register);
router.post("/changepassword/:id", user.changePassword);
router.post('/become-partner', user.becomePartner); 
router.post("/login", user.login);
router.post("/:id" , user.edit);

module.exports = router;
