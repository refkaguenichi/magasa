const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        res.status(403).send({ error: "Token is not valid anymore!", err });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ error: "You are not authorized!" });
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
