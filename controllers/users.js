import User from "../models/User.js";
import Demande from "../models/Demande.js";
import Offer from "../models/Offer.js";

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
    const offers = await Offer.find({ company: id });
    res.status(200).json(offers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
