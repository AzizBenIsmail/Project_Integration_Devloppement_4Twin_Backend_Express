const Evaluation = require("../models/evaluationSchema");

const getEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find();
    if (!evaluations || evaluations.length === 0) {
      throw new Error("Evaluations not found!");
    }
    res.status(200).json({ evaluations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvaluation = async (req, res, next) => {
  try {
    const { username } = req.params;
    const evaluations = await Evaluation.find({ usernameE: username });
    if (!evaluations || evaluations.length === 0) {
      throw new Error("Evaluations not found for the given username!");
    }
    res.status(200).json({ evaluations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addXP = async (req, res, next) => {
  try {
    const { username, xp } = req.params;
    const evaluation = await Evaluation.findOne({ usernameE: username });

    if (!evaluation) {
      throw new Error("Evaluation not found for the given username!");
    }

    // Mettre à jour le niveau et l'XP
    evaluation.xp += parseInt(xp);
    while (evaluation.xp >= 100) {
      evaluation.lvl += 1;
      evaluation.xp -= 100;
    }

    await evaluation.save();

    res.status(200).json({ message: "XP added successfully", evaluation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvaluations,
  getEvaluation,
  addXP
};
