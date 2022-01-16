const Order = require("../models/Order");

//new order
exports.addOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res
      .status(200)
      .send({ success: "Order added successfully", order: savedOrder });
  } catch (error) {
    res.status(400).send({ error: "Can't add order!" });
  }
};

//update order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send({
      success: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(400).send({ error: "Order can't be updated!" });
  }
};

//delete order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: "Order deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "Order can't be deleted!" });
  }
};

//get user order
exports.getOrder = async (req, res) => {
  try {
    const findOrder = await Order.find({ userId: req.params.userId });
    res.status(200).send({
      success: "Order which you search:",
      order: findOrder,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get Order!" });
  }
};

//get all orders
exports.getAllOrders = async (req, res) => {
  try {
    findOrders = await Order.find();
    res.status(200).send({
      success: "All Orders!",
      orders: findOrders,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get orders!" });
  }
};

//Get monthly income
exports.getOrderIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gt: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send({ success: "Orders income", data });
  } catch (error) {
    res.status(400).send({ error: "Can't get orders income!" });
  }
};
