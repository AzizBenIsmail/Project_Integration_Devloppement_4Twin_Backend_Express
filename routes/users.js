var express = require("express");
const validate = require("../middlewares/validate");
const Register = require("../middlewares/Register");
const upload = require("../middlewares/upload");
const auth= require("../middlewares/auth");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
var router = express.Router();
const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  forgotpwd,
  resetpwd,
} = require("../controllers/userControllers");

const User = require("../models/userSchema");
const AuthGoogle = require("../controllers/auth/google");
const AuthController = require("../controllers/auth/auth-controller");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const UnauthenticatedException=require('../exceptions/unauthenticated-exception')

/* GET users listing. */
router.get("/", getUsers);
router.get("/getUser/:id",auth,getUser);
router.post("/", upload.single("image_user"), Register, addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", AuthController.login);
router.post("/register",upload.single("image_user"),Register,AuthController.register);
router.get("/logout", AuthController.logout);

//forgot password
router.post("/forgotpwd", forgotpwd);

//reset password

router.put("/resetpwd", resetpwd);

//test section ( will  be deleted later )


router.post("/test", auth, (req, res) => {
  console.log(req.user);
  res.send("done");
});

router.get("/test", auth, (req, res) => {
  console.log(req.user);
  res.send("done");
});
// if page not found then status = 404 and message ... page not found
router.all("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
