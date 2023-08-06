import express from "express";
import {
  getUser,
  getAllUsers,
  getUserDemandes,
  getUserOffers,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// @GET     "/users/:id"
// @desc    Get user profile data by token
router.get("/:id", verifyToken, getUser);

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

export default router;
