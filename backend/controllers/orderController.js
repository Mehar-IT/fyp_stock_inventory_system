const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
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
    orderedAt: new Date().toISOString().slice(0, 10),
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
    "name email dept"
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
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email dept"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email dept");

  res.status(200).json({
    success: true,
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
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});

exports.getFilteredOrder = asyncHandler(async (req, res, next) => {
  const { orderStatus, orderedAt, dept } = req.query;

  Order.find({
    orderStatus: { $regex: `${orderStatus ?? ""}`, $options: "i" },
    orderedAt: { $lte: new Date(orderedAt) },
  })
    .populate({
      path: "user",
      select: "dept",
      match: { dept: { $regex: `${dept ?? ""}`, $options: "i" } },
      options: { sort: { createdAt: -1 } },
    })
    .exec((err, orders) => {
      if (err) {
        res.status(500);
        return next(new Error(err));
      }
      orders = orders.filter((item, index) => {
        if (item?.user !== null) {
          return item;
        }
      });

      res.status(200).json({
        success: true,
        orders,
      });
    });
});
