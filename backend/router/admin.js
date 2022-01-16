const express = require("express");
const { Login } = require("../controllers/admin.controllers");
const { loginValidate, validation } = require("../middlewares/validate");
const router = express.Router();

//login
router.post("/login", loginValidate(), validation, Login);

module.exports = router;
