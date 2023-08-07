import express from "express";
import {
  getUser,
  getAllUsers,
  getLoggedProfile,
  getUserDemandes,
  getUserOffers,
  getUserEvaluations,
  getEvaluationsByCompany,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// @GET     "/profile"
// @desc    Get user profile data by token
router.get("/profile", verifyToken, getLoggedProfile);

// @GET     "/users/:id"
// @desc    Get user profile data by token
router.get("/profile/:id", verifyToken, getUser);

// @GET     "/users/"
// @desc    Get all users
router.get("/:id", verifyToken, getAllUsers);

// @GET     "/users/:id/demandes"
// @desc    Get user demandes
router.get("/:id/demandes", verifyToken, getUserDemandes);

// @GET     "/users/:id/offers"
// @desc    Get user offers
router.get("/:id/offers", verifyToken, getUserOffers);

// @PUT      /profile
// @desc   Update a users profile info
// router.put("/:id", verifyToken, updateProfile);

// @GET     "/users/:id/student/evaluations"
// @desc    Get user evaluations
router.get("/:id/student/evaluations", verifyToken, getUserEvaluations);

// @GET     "/users/:id/company/evaluations"
// @desc    Get evaluations by company
router.get("/:id/company/evaluations", verifyToken, getEvaluationsByCompany);

export default router;
