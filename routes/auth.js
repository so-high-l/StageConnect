import express from "express";
import { login, logout } from "../controllers/auth.js";

const router = express.Router();

// @GET     "/auth/login"
// @desc    Login User
router.post("/login", login);

// @POST     "/auth/logout"
// @desc     Logout the user and invalidate the token
router.post("/logout", logout);
export default router;
