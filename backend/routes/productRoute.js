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
// superAdmin routes started
router.get("/all", protect, authorizeRole("superAdmin"), getAllProducts);
router
  .route("/:_id")
  .get(protect, authorizeRole("admin", "superAdmin"), getSingleProduct)
  .patch(protect, authorizeRole("superAdmin"), updateSingleProduct)
  .delete(protect, authorizeRole("superAdmin"), deleteSingleProduct);
// superAdmin routes ended
router.post("/", protect, upload.single("image"), authorizeRole("admin", "superAdmin"), createProduct);
// router.patch("/:id", protect, upload.single("image"), authorizeRole("admin", "superAdmin"), updateProduct);
router.get("/", protect, authorizeRole("admin", "superAdmin"), getProducts);
router.get("/:id", protect, authorizeRole("admin", "superAdmin"), getProduct);
// router.delete("/:id", protect, authorizeRole("superAdmin"), deleteProduct);
module.exports = router;
