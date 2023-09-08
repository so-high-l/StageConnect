import mongoose from "mongoose";

const demandeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userPicturePath: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "pending" },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
});

const Demande = mongoose.model("Demande", demandeSchema);

export default Demande;
