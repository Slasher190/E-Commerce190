import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser, authorizedUser } from "../middleware/auth.js";

// loginUser, logout, registerUser, forgotPassword, resetPassword, getUserDetails,
// updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole,
// deleteUser

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedUser("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedUser("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedUser("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedUser("admin"), deleteUser);

router.route("/logout").get(logout);

export default router;
