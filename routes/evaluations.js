const express = require('express');
const {
    getEvaluations,
    getEvaluation,
    addXP
} = require("../controllers/evaluationController");

const router = express.Router();

router.get("/", getEvaluations);
router.get("/:username", getEvaluation);
router.post("/:username/addxp/:xp", addXP); // Nouvelle route pour la fonction addXP

module.exports = router;
