import Evaluation from "../models/Evaluation.js";

// CREATE EVALUATION
export const createEvaluation = async (req, res) => {
  try {
    const { note, comment, cible } = req.body;
    const newEvaluation = new Evaluation({
      note,
      comment,
      author: req.user.id,
      cible,
    });
    const evaluation = await newEvaluation.save();
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL EVALUATIONS
export const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// GET EVALUATION BY ID
export const getEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluation = await Evaluation.findById(id);
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
