const User = require("../../models/userSchema.js");
const InvalidCreationException = require("../../exceptions/invalid-credential-exception");
const bcrypt = require("bcrypt");
const userControllers = require("../userControllers.js");
const jwt = require("jsonwebtoken");
const { appKey, tokenExpiresIn } = require("../../config/app.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const { addUser } = require('../../controllers/userControllers');
const upload = multer({ dest: 'uploads/' });

class registerController {

async register(req, res) {
  
    try {
    //  await user.save();
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      email,
      username,
      password
      ,
      profileImage: req.file.filename
    });

    await newUser.save();
      passport.authenticate("local")(req, res, function () {
        res.redirect("/users/test");
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving user to database");

      res.redirect("/users/register");
    }
  }
}