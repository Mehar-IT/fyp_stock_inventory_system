const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description, avatar } = req.body;

  //   Validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    category,
    quantity,
    price,
    description,
    avatar,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    user: req.user.id,
  })
    .populate("user", "name email bio")
    .sort({ createdAt: -1 });

  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  // .populate("user", "name email bio")
  // .sort({ createdAt: -1 });
  res.status(200).json({ products });
});
// get single product -- admin
const getSingleProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404);
    throw new Error(`invalid ID ${_id}`);
  }
  const product = await (
    await Product.findById(_id)
  ).populate("user", "name email bio");
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json({ product });
});
// update single product -- admin
const updateSingleProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404);
    throw new Error(`invalid ID ${_id}`);
  }
  const { name, category, quantity, price, description } = req.body;

  const newUpdateData = {
    name,
    category,
    quantity,
    price,
    description,
    // status
  };

  const update_product = await Product.findByIdAndUpdate(_id, newUpdateData, {
    new: true,
  });
  if (!update_product) {
    res.status(404);
    throw new Error("Product is not updated");
  }
  res.status(200).json({ update_product });
});
// delete single product -- admin
const deleteSingleProduct = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404);
    throw new Error(`invalid ID ${_id}`);
  }
  const delete_product = await Product.findByIdAndRemove(_id);
  if (!delete_product) {
    res.status(404);
    throw new Error("Product is not Deleted");
  }
  res.status(200).json({ delete_product });
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  // updateProduct,
  getAllProducts, // --admin
  getSingleProduct, // --admin
  updateSingleProduct, // --admin
  deleteSingleProduct, // --admin
};
