import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userPicturePath: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
