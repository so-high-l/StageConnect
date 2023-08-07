import User from "../models/User.js";
import Demande from "../models/Demande.js";
import Offer from "../models/Offer.js";
import Evaluation from "../models/Evaluation.js";

/* GET USER */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET LOGGED USER PROFILE */
export const getLoggedProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET A SPECIFIC USER DEMANDES */
export const getUserDemandes = async (req, res) => {
  try {
    const { id } = req.params;
    const demandes = await Demande.find({ student: id });
    res.status(200).json(demandes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET A SPECIFIC USER OFFERS */
export const getUserOffers = async (req, res) => {
  try {
    const { id } = req.params;
    const offers = await Offer.find({ companyId: id });
    res.status(200).json(offers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET A SPECIFIC USER EVALUATIONS */
export const getUserEvaluations = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluations = await Evaluation.find({ cible: id });
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET A SPECIFIC EVALUATIONS BY COMPANY */
export const getEvaluationsByCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluations = await Evaluation.find({ author: id });
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
