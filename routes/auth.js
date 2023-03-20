var express = require('express');
const validate = require("../middlewares/validate");
const Register = require("../middlewares/Register");
const upload = require("../middlewares/upload");
var router = express.Router();
const { getFablabs, acceptFablabRequest, declineFablabRequest ,addFablabRequest} = require('../controllers/fablabController');
const AuthGoogle = require('../controllers/auth/google');
const AuthController = require('../controllers/auth/auth-controller');
const passport = require('passport');
const passportLocalMongoose= require('passport-local-mongoose');


/* GET users listing. */
router.get('/connection',AuthGoogle.loginGoogle);


router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  
  // Handle Google OAuth 2.0 callback
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Redirect user to home page after successful authentication
      res.redirect("http://localhost:3000/landing-page");
    }
  );

// if page not found then status = 404 and message ... page not found
router.all('*', (req, res) => {
    res.status(404).send('Page not found!')
})


module.exports = router;
