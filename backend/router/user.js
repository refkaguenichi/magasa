const express = require("express");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middlewares/isAuth");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  userStats,
  Register,
  Login,
  currentUser,
} = require("../controllers/user.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const router = express.Router();

//resgister=sign up=create an account
router.post("/register", registerValidate(), validation, Register);
//login
router.post("/login", loginValidate(), validation, Login);

//current
router.get("/current", verifyTokenAndAuth, currentUser);
//update user
router.put(
  "/edit/:id",
  verifyTokenAndAuth,
  upload.single("avatar"),
  updateUser
);
//delete user
router.delete("/:id", verifyTokenAndAuth, deleteUser);
//get user
router.get("/find/:id", verifyTokenAndAdmin, getUser);
//get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);
//get user status
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
