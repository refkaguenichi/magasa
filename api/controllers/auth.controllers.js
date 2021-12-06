const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register
exports.Register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const { email } = req.body;
    //1st step:verify if the email is existed
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send({
        error: "Try with another email address, it's already used! ",
      });
    }
    // save user
    const savedUser = await newUser.save();
    res.status(200).send({ success: "Register successfully", user: savedUser });
  } catch (error) {
    res.status(400).send({ error: "Account can't be created!" });
  }
};

//login
exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    !findUser && res.status(401).send({ error: "Bad credentials" });
    const hashedPassword = CryptoJS.AES.decrypt(
      findUser.password,
      process.env.PASS_SECRET
    );
    const originalPass = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPass !== password &&
      res.status(401).send({ error: "Bad credentials" });
    const accessToken = jwt.sign(
      {
        id: findUser._id,
        isAdmin: findUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    const { pass, ...others } = findUser._doc;
    res.status(200).send({
      success: "Login successfully",
      user: { ...others, accessToken },
    });
  } catch (error) {
    res.status(400).send({ error: "Login failed!" });
  }
};
