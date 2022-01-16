const express = require("express");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../middlewares/isAuth");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product.controllers");
const router = express.Router();

//new product
router.post("/", verifyTokenAndAdmin, addProduct);
//update product
router.put("/:id", verifyTokenAndAdmin, updateProduct);
//delete product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
//get product
router.get("/find/:id", getProduct);
//get all products
router.get("/", getAllProducts);

module.exports = router;
