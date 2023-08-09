import Offer from "../models/Offer.js";

/* CREATE OFFER */
export const createOffer = async (req, res) => {
  try {
    console.log("creating offer ...");
    const { title, description, companyId, categoryId, startDate, endDate } =
      req.body;
    const newOffer = new Offer({
      title,
      description,
      companyId,
      categoryId,
      startDate,
      endDate,
    });
    const offer = await newOffer.save();
    const updatedOffers = await Offer.find();
    res.status(201).json(updatedOffers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL OFFERS */
export const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* GET OFFER BY ID */
export const getOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById(id);
    res.status(200).json(offer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* DELETE OFFER BY ID */
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    res
      .status(200)
      .json({ message: "Offer deleted successfully", deletedOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* UPDATE OFFER */
export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, companyId, categoryId, startDate, endDate } =
      req.body;

    // Check if the logged-in user's ID matches the company ID
    if (req.user.id !== companyId) {
      return res.status(403).json({
        error: "Access Denied: You can only update your own company's offers",
      });
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      {
        title,
        description,
        companyId,
        categoryId,
        startDate,
        endDate,
      },
      { new: true }
    );

    res.status(200).json(updatedOffer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
