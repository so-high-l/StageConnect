import Demande from "../models/Demande.js";
import Offer from "../models/Offer.js";

// CREATE DEMANDE
export const createDemande = async (req, res) => {
  try {
    const { title, message, status, student, offer } = req.body;
    const newDemande = new Demande({
      title,
      message,
      status,
      student: req.user.id,
      offer,
    });
    const demande = await newDemande.save();
    res.status(201).json(demande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL DEMANDES
export const getAllDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.status(200).json(demandes);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// GET DEMANDE
export const getDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const demande = await Demande.findById(id);
    if (!demande) res.status(404).json({ msg: "Demande not found" });
    res.status(200).json(demande);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// RESPOND TO DEMANDE (Only companies)
export const respondToDemande = async (req, res) => {
  try {
    const { id, accepted } = req.params;

    if (!id || !accepted) {
      return res.status(400).json({
        msg: "Invalid request. Please provide both 'id' and 'accepted' parameters.",
      });
    }

    const acceptedValue = accepted === "true";
    const updatedStatus = acceptedValue ? "accepted" : "rejected";

    const demande = await Demande.findById(id);
    if (!demande) {
      return res.status(404).json({ msg: "Demande not found" });
    }
    const offer = await Offer.findById(demande.offer);
    if (!offer) {
      return res.status(404).json({ msg: "Offer not found" });
    }
    if (offer.companyId.toString() !== req.user.id) {
      return res.status(403).json({
        msg: "Access Denied: You can only respond to demandes for your own company's offers",
      });
    }
    demande.status = updatedStatus;
    const updatedDemande = await demande.save();
    res
      .status(200)
      .json({ msg: "Demande status updated successfully", updatedDemande });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE DEMANDE
export const deleteDemande = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: "Invalid request. Please provide a valid demande ID.",
      });
    }

    const demande = await Demande.findById(id);
    if (!demande) {
      return res.status(404).json({ msg: "Demande not found" });
    }

    const offer = await Offer.findById(demande.offer);

    // Check if the logged-in user is either the company associated with the offer or the user who made the demande
    if (
      offer.companyId.toString() !== req.user.id &&
      demande.student.toString() !== req.user.id
    ) {
      return res.status(403).json({
        msg: "Access Denied: You can only delete demandes for your own company's offers or your own demandes",
      });
    }

    await demande.deleteOne();

    res.status(200).json({ msg: "Demande deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
