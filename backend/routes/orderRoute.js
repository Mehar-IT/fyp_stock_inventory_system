const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  getFilteredOrder,
  // updateOrder,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/orderController");
// const { isAuthenticated, authorizeRole } = require("../middleware/auth");
const authorizeRole = require("../middleWare/authorizeRole");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router
  .route("/order/new")
  .post(protect, authorizeRole("admin", "superAdmin"), newOrder);
router
  .route("/order/:id")
  .get(protect, authorizeRole("admin", "superAdmin"), getSingleOrder);
router
  .route("/orders/me")
  .get(protect, authorizeRole("admin", "superAdmin"), myOrders);
router
  .route("/admin/orders")
  .get(protect, authorizeRole("superAdmin"), getAllOrder);
router
  .route("/admin/filterOrder")
  .get(protect, authorizeRole("admin", "superAdmin"), getFilteredOrder);
router
  .route("/admin/order/:id")
  .put(protect, authorizeRole("superAdmin"), updateOrderStatus)
  // .put(protect, authorizeRole("superAdmin"), updateOrder)
  .delete(protect, authorizeRole("superAdmin"), deleteOrder);

module.exports = router;
