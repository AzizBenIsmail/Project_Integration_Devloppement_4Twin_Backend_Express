var express = require("express");
const upload = require("../middlewares/upload");
var router = express.Router();
const auth= require("../middlewares/auth");

const {
addInvest,deleteInvest,getInvest,getInvestUser,getlisteInverstors
} = require("../controllers/investController");


/* GET users listing. */
router.get("/",auth, getInvest);
router.get("/:idUser",auth, getInvestUser);
router.get("/listeInverstors/:idProject",auth, getlisteInverstors);
router.post("/:idUser/:idProject",auth,addInvest);
router.delete("/:id",auth, deleteInvest);

// if page not found then status = 404 and message ... page not found
router.all("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
