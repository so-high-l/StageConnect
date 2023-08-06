import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  note: { type: Number, required: true },
  comment: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cible: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;
