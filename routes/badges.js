const express = require("express");
const { getBadges,getBadge,addBadge, deleteBadge } = require("../controllers/badgesController");

const router = express.Router();

router.get("/", getBadges);
router.get("/:username", getBadge);
router.post("/add", addBadge);
router.delete('/:id',deleteBadge);

module.exports = router;