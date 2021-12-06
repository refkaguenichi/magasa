const Cart = require("../models/Cart");

//new cart
exports.addCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res
      .status(200)
      .send({ success: "Cart added successfully", cart: savedCart });
  } catch (error) {
    res.status(400).send({ error: "Can't add cart!" });
  }
};

//update cart
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      success: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(400).send({ error: "Cart can't be updated!" });
  }
};

//delete Cart
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "Cart can't be deleted!" });
  }
};

//get user cart
exports.getCart = async (req, res) => {
  try {
    const findCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).send({
      success: "Cart which you search:",
      cart: findCart,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get Cart!" });
  }
};

//get all Carts
exports.getAllCarts = async (req, res) => {
  try {
    findCarts = await Cart.find();
    res.status(200).send({
      success: "All Carts!",
      carts: findCarts,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get carts!" });
  }
};
