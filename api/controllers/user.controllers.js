const User = require("../models/User");

//update user
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ success: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).send({ error: "User can't be updated!" });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "User can't be deleted!" });
  }
};

//get user
exports.getUser = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id);
    const { pass, ...others } = findUser._doc;
    res.status(200).send({
      success: "User which you search:",
      user: others,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get user!" });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const findUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).send({
      success: "All users!",
      users: findUsers,
    });
  } catch (error) {
    res.status(400).send({ error: "Can't get all users!" });
  }
};

//get user stats
exports.userStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gt: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ success: "user stats", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Can't get user stats!", error });
  }
};
