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
} = require("../controllers/user.controllers");
const router = express.Router();
//update user
router.put("/edit/:id", verifyTokenAndAuth, updateUser);
//delete user
router.delete("/:id", verifyTokenAndAuth, deleteUser);
//get user
router.get("/find/:id", verifyTokenAndAdmin, getUser);
//get all users
router.get("/", verifyTokenAndAdmin, getAllUsers);
//get user status
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
