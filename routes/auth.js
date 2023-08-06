import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// @GET     "/auth/login"
// @desc    Login User
router.post("/login", login);

export default router;
