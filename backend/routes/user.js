import express from "express";
import { register, login, logout, getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
//login, logout, register

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

//get profile only when logged in
router.get("/me", isAuthenticated, getMyProfile)

export default router;
