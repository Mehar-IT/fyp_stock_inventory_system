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
router.get("/getuser", protect, authorizeRole("admin", "superAdmin"), getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, authorizeRole("admin", "superAdmin"), updateUser);
router.patch("/changepassword", protect, authorizeRole("admin", "superAdmin"), changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
// superAdmin routes started
router.get("/all", protect, authorizeRole("superAdmin"), getAllUsers);
router
  .route("/:_id")
  .get(protect, authorizeRole("superAdmin"), getSingleUser)
  .patch(protect, authorizeRole("superAdmin"), updateSingleUser)
  .delete(protect, authorizeRole("superAdmin"), deleteSingleProfile);
// superAdmin routes started
module.exports = router;
