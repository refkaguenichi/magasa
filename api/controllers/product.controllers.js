const Product = require("../models/Product");

//new product
exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .send({ success: "Product added successfully", product: savedProduct });
  } catch (error) {
    res.status(400).send({ error: "Can't add product!" });
  }
};

//update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      success: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({ error: "Product can't be updated!" });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: "Product deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "Product can't be deleted!" });
  }
};

//get product
exports.getProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById(req.params.id);
    res.status(200).send({
      success: "Product which you search:",
      product: findProduct,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get product!" });
  }
};

//get all products
exports.getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    if (qNew) {
      findProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      findProducts = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      findProducts = await Product.find();
    }
    res.status(200).send({
      success: "All Products!",
      products: findProducts,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get all products!" });
  }
};
