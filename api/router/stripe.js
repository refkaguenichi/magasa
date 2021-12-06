const express = require("express");
const { tryPayment } = require("../controllers/stripe.controllers");
const router = express.Router();

//new payment
router.post("/payment", tryPayment);

module.exports = router;
