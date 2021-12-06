const express = require("express");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/isAuth");
const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
} = require("../controllers/cart.controllers");
const router = express.Router();

//new cart
router.post("/", verifyToken, addCart);
//update cart
router.put("/:id", verifyTokenAndAuth, updateCart);
//delete cart
router.delete("/:id", verifyTokenAndAuth, deleteCart);
//get user cart
router.get("/find/:userId", verifyTokenAndAuth, getCart);
//get all carts
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
