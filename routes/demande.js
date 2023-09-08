import express from "express";
import {
  createDemande,
  getDemande,
  getAllDemandes,
  respondToDemande,
  deleteDemande,
  getAllDemandesByCompany,
} from "../controllers/demande.js";
import { verifyToken } from "../middleware/auth.js";
import { isStudent, isCompany } from "../middleware/roles.js";

const router = express.Router();
// @POST     "/demande/"
// @desc    Create a new Demande
router.post("/", verifyToken, isStudent, createDemande);

// @GET     "/demande/"
// @desc    Get all demandes
router.get("/", verifyToken, getAllDemandes);

// @GET     "/demande/:id"
// @desc    Get Demande by id
router.get("/:id", verifyToken, getDemande);

// @PUT     "/demande/:id"
// @desc    Respond to a demande by id
// @desc    :id is the offer Id / :accepted boolean value true if the company accepted the offer or false otherwise
router.put("/:id/:accepted", verifyToken, isCompany, respondToDemande);

// @DELETE  "/demande/:id"
// @desc    Delete a demande by id
router.delete("/:id", verifyToken, deleteDemande);

// @GET     "/demande/company/:companyId"
// @desc    Get all demandes
router.get("/company/:companyId", verifyToken, getAllDemandesByCompany);

export default router;
