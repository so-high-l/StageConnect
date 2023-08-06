import express from "express";
import {
  createOffer,
  getOffer,
  getAllOffers,
  updateOffer,
  deleteOffer,
} from "../controllers/offer.js";
import { verifyToken } from "../middleware/auth.js";
import { isStudent, isCompany } from "../middleware/roles.js";

const router = express.Router();
// @POST     "/Offer/"
// @desc    Create a new Offer
router.post("/", verifyToken, isCompany, createOffer);

// @GET     "/Offer/"
// @desc    Get all offers
router.get("/", verifyToken, getAllOffers);

// @GET     "/Offer/:id"
// @desc    Get Offer by id
router.get("/:id", verifyToken, getOffer);

// @PUT     "/Offer/:id"
// @desc    Update Offer by id
router.put("/:id", verifyToken, isCompany, updateOffer);

// @DELETE  "/Offer/:id"
// @desc    Delete Offer by id
router.delete("/:id", verifyToken, isCompany, deleteOffer);

export default router;
