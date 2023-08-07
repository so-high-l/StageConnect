import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { isStudent, isCompany } from "../middleware/roles.js";
import {
  createEvaluation,
  getAllEvaluations,
  getEvaluation,
} from "../controllers/evaluation.js";

const router = express.Router();

// @POST     "/evaluation/"
// @desc    Create a new evaluation
router.post("/", verifyToken, isCompany, createEvaluation);

// @GET     "/evaluation/"
// @desc    Get all evaluations
router.get("/", verifyToken, getAllEvaluations);

// @GET     "/evaluation/"
// @desc    Get all evaluations
router.get("/:id", verifyToken, getEvaluation);

export default router;
