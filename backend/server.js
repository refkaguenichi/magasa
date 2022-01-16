//import express
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoute = require("./router/user");
const adminRoute = require("./router/admin");
const productRoute = require("./router/product");
const cartRoute = require("./router/cart");
const orderRoute = require("./router/order");
const stripeRoute = require("./router/stripe");
//instance of all express methods
const app = express();
// app.use(formidableMiddleware());
//-------------------------------------
require("dotenv").config();
//connect with database
connectDB();
//payment middleware
app.use(cors());
//Global middlware to read json type
app.use(express.json());
//acces to routers
//user routes
app.use("/api/users", userRoute);
//admin routes
app.use("/api/admins", adminRoute);
//product routes
app.use("/api/products", productRoute);
// cart routes
app.use("/api/carts", cartRoute);
// order routes
app.use("/api/orders", orderRoute);
// stripe route
app.use("/api/checkout", stripeRoute);
//port
PORT = process.env.PORT;
//start the server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
