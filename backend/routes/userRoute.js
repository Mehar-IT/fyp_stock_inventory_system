const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getAllUsers, // --Admin
  getSingleUser, // --Admin
  updateSingleUser, // --Admin
  deleteSingleProfile, // --Admin
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");
const authorizeRole = require("../middleWare/authorizeRole");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
// admin routes started
router.get("/all", protect, authorizeRole("admin"), getAllUsers);
router
  .route("/:_id")
  .get(protect, authorizeRole("admin"), getSingleUser)
  .patch(protect, authorizeRole("admin"), updateSingleUser)
  .delete(protect, authorizeRole("admin"), deleteSingleProfile);
// admin routes started
module.exports = router;
