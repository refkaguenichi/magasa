const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//login
exports.Login = async (req, res) => {
  try {
    // email & password
    const { email, password, isAdmin } = req.body;
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

    if (isAdmin === false) {
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
