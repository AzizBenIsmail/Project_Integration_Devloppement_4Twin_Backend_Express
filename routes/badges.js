const express = require("express");
const { getBadges,getBadge,addBadge, deleteBadge,getFBadge,getTBadge,updateBadge,getFBadges } = require("../controllers/badgesController");

const router = express.Router();

router.get("/", getBadges);
router.get("/:username", getBadge);
router.post("/add", addBadge);
router.delete('/:id',deleteBadge);
router.get("/:username/t", getTBadge);
router.get("/:username/f", getFBadge);
router.get("/find/false", getFBadges);

router.put('/:id/update', updateBadge);



module.exports = router;