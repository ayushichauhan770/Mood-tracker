const express = require("express");
const router = express.Router();
const { getHoroscope } = require("../controllers/horoscopeController");

router.post("/details", getHoroscope);

module.exports = router;
