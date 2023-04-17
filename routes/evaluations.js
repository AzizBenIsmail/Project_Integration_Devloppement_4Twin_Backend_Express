const express = require('express');
const {
    getEvaluations,
    getEvaluation,
    addXP,reduceXP
} = require("../controllers/evaluationController");

const router = express.Router();

router.get("/", getEvaluations);
router.get("/:username", getEvaluation);
router.post("/:username/addxp/:xp", addXP); // Nouvelle route pour la fonction addXP
router.post("/:username/reducexp/:xp", reduceXP);

module.exports = router;
