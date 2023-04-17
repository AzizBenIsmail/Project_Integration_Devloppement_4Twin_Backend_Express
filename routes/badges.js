const express = require("express");
const { getBadges,getBadge,addBadge } = require("../controllers/badgesController");

const router = express.Router();

router.get("/", getBadges);
router.get("/:username", getBadge);
router.post("/add", addBadge);
module.exports = router;