const express = require("express");
const { getBType,addBType, deleteBType } = require("../controllers/bTypeController");

const router = express.Router();

router.get("/", getBType);
router.post("/add", addBType);
router.delete('/:id',deleteBType);

module.exports = router;