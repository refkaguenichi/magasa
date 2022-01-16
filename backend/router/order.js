const express = require("express");
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getOrderIncome,
} = require("../controllers/order.controllers");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/isAuth");
const router = express.Router();

//new order
router.post("/", verifyToken, addOrder);
//update order
router.put("/:id", verifyTokenAndAdmin, updateOrder);
//delete order
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
//get user order
router.get("/find/:userId", verifyTokenAndAuth, getOrder);
//get all orders
router.get("/", verifyTokenAndAdmin, getAllOrders);
//get monthly income
router.get("/income", verifyTokenAndAdmin, getOrderIncome);

module.exports = router;
