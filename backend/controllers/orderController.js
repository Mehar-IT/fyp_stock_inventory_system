const Order = require("../models/orderModel");
const Product = require("../models/productModel");
// const ErrorHandler = require("../utils/errorhandlers");
// const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const asyncHandler = require("express-async-handler");
const errorHandler = require("../middleWare/errorMiddleware");
const mongoose = require("mongoose");

exports.newOrder = asyncHandler(async (req, res) => {
  const { name, quantity, description } = req.body;
  if (!name || !quantity || !description) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const order = await Order.create({
    name,
    quantity,
    description,
    orderedAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("order not found with this id");
    // return next(new ErrorHandler("order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  // let totalAmount = 0;

  // orders.forEach((order) => {
  //   totalAmount += order.totalPrice;
  // });

  res.status(200).json({
    success: true,
    // totalAmount,
    orders,
  });
});

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("order not found with this id");
  }

  if (order.orderStatus === "delivered") {
    res.status(400);
    throw new Error("you have already deliverd this product");
  }
  // if (order.orderStatus === "accepted") {
  //   console.log("ok");

  //   res.status(400);
  //   throw new Error("this order is already accepted");
  // }

  if (req.body.orderStatus === "accepted") {
    const { product, quantity } = req.body;
    order.product = product;
    order.quantity = quantity;

    if (!mongoose.Types.ObjectId.isValid(product)) {
      res.status(404);
      return next(new Error(`invalid ID ${product}`));
    }
    const stock = await Product.findById(product);

    if (!stock) {
      res.status(404);
      return next(new Error("Product not found with this id"));
    }
    if (stock.quantity < quantity) {
      res.status(404);
      return next(new Error("Product is out of stock"));
    }
    stock.quantity -= quantity;
    await stock.save({ validateBeforeSave: false });
  }

  order.orderStatus = req.body.orderStatus;
  if (req.body.orderStatus === "delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("order not found with this id");
    // return next(new ErrorHandler("order not found with this id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});
