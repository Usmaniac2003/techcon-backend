const express = require("express");
const address = require("./address");

const router = express.Router();

router.get("/" , address.index);
router.post("/" , address.create);


module.exports = router;
