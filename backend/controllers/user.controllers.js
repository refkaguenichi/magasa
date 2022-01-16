const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
//create an account
exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    //1st step:verify if the email is existed
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({
        error: "Try with another email address, it's already used! ",
      });
    }
    // new user
    const newUser = new User({ ...req.body });
    //hash password
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    newUser.password = hashedPassword;
    //save user to db
    //creat to token==key
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3 days" }
    );
    await newUser.save();
    res.status(200).send({
      success: "Account created successfully!",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).send({
      error: "Account can't be created!",
    });
  }
};

//login
exports.Login = async (req, res) => {
  try {
    // email & password
    const { email, password } = req.body;
    //   test if email exists
    const findUser = await User.findOne({ email });
    // if it isn't exited
    // bad credential
    if (!findUser) {
      return res.status(400).send({ error: "bad credential" });
    }
    // test password
    //   password in BD== password
    const comparePass = await bcrypt.compare(password, findUser.password);
    //   they r not equal
    // bad crential
    if (!comparePass) {
      return res.status(400).send({ error: "bad credential" });
    }
    //creat to token==key
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3 days" }
    );
    res.status(200).send({
      success: "Login successfully",
      user: findUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "login failed" });
  }
};

//current user
exports.currentUser = async (req, res) => {
  let user_id = req.user.id;
  try {
    currentUser = await User.findById(user_id);
    const { ...others } = currentUser._doc;
    const { iat, exp } = req.user;
    res.send({
      success: "Current user",
      user: { ...others, iat, exp },
    });
  } catch (error) {
    res.status(400).send({ error: "login failed" });
  }
};

//update user
exports.updateUser = async (req, res) => {
  let avatar;
  if (req.file) {
    avatar = req.file.filename;
  }
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
        $set: { ...req.body, avatar },
      },
      { new: true }
    );
    res
      .status(200)
      .send({ success: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    console.log(error);
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
