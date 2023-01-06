const express = require("express");
const authorizeRole = require("../middleWare/authorizeRole");
const { contactUs } = require("../controllers/contactController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");

router.post("/", protect, authorizeRole("admin", "superAdmin"), contactUs);

module.exports = router;
