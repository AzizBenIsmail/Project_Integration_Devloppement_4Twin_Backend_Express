var express = require("express");
const upload = require("../middlewares/upload");
var router = express.Router();
const auth= require("../middlewares/auth");
const projectValidate = require("../middlewares/projectValidate");

const {
  addproject,
  getprojects,
  getproject,
  getProjectsByCreator,
  updateproject,
  deleteproject,
  getProjectsValider
} = require("../controllers/projectController");

/* GET Projects listing. */
router.get("/",auth, getprojects);
router.get("/getProjectsValider",auth, getProjectsValider);
router.get("/:id",auth, getproject);
router.get("/User/:creatorId",auth, getProjectsByCreator);
router.post("/",auth, upload.single("image_project"),projectValidate,addproject);
router.put("/:id",auth, updateproject);
router.delete("/:id",auth, deleteproject);

// if page not found then status = 404 and message ... page not found
router.all("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
