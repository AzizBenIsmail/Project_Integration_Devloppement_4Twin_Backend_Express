const express = require("express");
const { getBadges,getBadge } = require("../controllers/badgesController");

const router = express.Router();

router.get("/", getBadges);
router.get("/:username", getBadge);

module.exports = router;