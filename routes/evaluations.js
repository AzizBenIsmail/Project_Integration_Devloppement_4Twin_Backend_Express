const express = require('express');
const {
    getEvaluations,
    getEvaluation,
    addXP,reduceXP, getTop5Evaluations
} = require("../controllers/evaluationController");

const router = express.Router();

router.get("/", getEvaluations);
router.get("/find/top5", getTop5Evaluations);

router.get("/:username", getEvaluation);
router.post("/:username/addxp/:xp", addXP); // Nouvelle route pour la fonction addXP
router.post("/:username/reducexp/:xp", reduceXP);

module.exports = router;
