const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const authorizeRole = require("../middleWare/authorizeRole");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts, // --Admin
  getSingleProduct, // --Admin
  updateSingleProduct, // --Admin
  deleteSingleProduct, // --Admin
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
// admin routes started
router.get("/all", protect, authorizeRole("admin"), getAllProducts);
router
  .route("/:_id")
  .get(protect, getSingleProduct)
  .patch(protect, authorizeRole("admin"), updateSingleProduct)
  .delete(protect, authorizeRole("admin"), deleteSingleProduct);
// admin routes ended
router.post("/", protect, upload.single("image"), createProduct);
// router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
// router.delete("/:id", protect, authorizeRole("admin"), deleteProduct);
module.exports = router;
