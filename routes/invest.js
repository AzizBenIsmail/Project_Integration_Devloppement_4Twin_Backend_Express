var express = require("express");
const upload = require("../middlewares/upload");
var router = express.Router();
const {
addInvest,deleteInvest,getInvest,getInvestUser
} = require("../controllers/investController");


/* GET users listing. */
router.get("/", getInvest);
router.get("/:idUser", getInvestUser);
router.post("/:idUser/:idProject",addInvest);
router.delete("/:id", deleteInvest);

// if page not found then status = 404 and message ... page not found
router.all("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
