import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { isStudent, isCompany } from "../middleware/roles.js";
import { search } from "../controllers/search.js";

const router = express.Router();

// @GET     "/:searchQuery"
// @desc    Create a new evaluation
router.get("/:searchQuery", verifyToken, search);

export default router;
