const express = require('express');
const {
    getEvaluations,
    getEvaluation,
    addXP,reduceXP, getTop3Evaluations, deleteEvaluation, isTop3Evaluation
} = require("../controllers/evaluationController");

const router = express.Router();

router.get("/", getEvaluations);
router.get("/find/top3", getTop3Evaluations);
router.get("/istop3/:username", isTop3Evaluation);

router.get("/:username", getEvaluation);
router.post("/:username/addxp/:xp", addXP); // Nouvelle route pour la fonction addXP
router.post("/:username/reducexp/:xp", reduceXP);

//router.delete('/del/:username',deleteEvaluation);

module.exports = router;
