const express = require('express');
const {
    getEvaluations,
    getEvaluation
  } = require("../controllers/evaluationController");
  
const router = express.Router();


router.get("/", getEvaluations);
router.get("/:username", getEvaluation);

module.exports = router;