import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getMyProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

//loginUser, logout, registerUser, forgotPassword, resetPassword, getUserDetails,
// updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole,
// deleteUser

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout);

//get profile only when logged in
router.get("/me", isAuthenticated, getMyProfile);

export default router;
