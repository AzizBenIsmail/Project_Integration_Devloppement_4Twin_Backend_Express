const express = require('express');
const { getEvaluations } = require('../controllers/evaluationController');
const router = express.Router();

router.get("/", getEvaluations);

module.exports = router;
