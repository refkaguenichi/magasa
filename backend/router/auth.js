const express = require("express");
const { Register, Login } = require("../controllers/auth.controllers");
const router = express.Router();

//resgister=sign up=create an account
router.post("/register", Register);
//login
router.post("/login", Login);

module.exports = router;
