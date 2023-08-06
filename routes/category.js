import express from "express";
import {
  createCategory,
  getCategory,
  getAllCategories,
} from "../controllers/category.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
// @POST     "/category/"
// @desc    Create a new category
router.post("/", verifyToken, createCategory);

// @GET     "/category/"
// @desc    Get all categories
router.get("/", verifyToken, getAllCategories);

// @GET     "/category/:id"
// @desc    Get category by id
router.get("/:id", verifyToken, getCategory);

export default router;
