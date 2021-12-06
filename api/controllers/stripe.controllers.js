const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//new product
exports.tryPayment = async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(400).send(stripeErr);
      } else {
        res.status(200).send(stripeRes);
      }
    }
  );
};
