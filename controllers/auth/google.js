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
class AuthGoogle {
    async loginGoogle(req, res) {
        passport.use(
          new GoogleStrategy(
            {
              clientID: process.env.client_id,
              clientSecret: process.env.client_secret,
              callbackURL: "http://localhost:5000/auth/google/callback",
              userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
              passReqToCallback: true,
            },
            async function (req, accessToken, refreshToken, profile, done) {
              try {
                console.log(profile);
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                  return done(null, existingUser);
                }
                const newUser = new User({
                  googleId: profile.id,
                  username:profile.displayName,
                  first_Name: profile.given_name,
                  last_Name: profile.family_name,
                  email: profile.emails[0].value,
                  image_user:profile.photos[0].value
                });
                await newUser.save();
                done(null, newUser);
              } catch (err) {
                done(err, false);
              }
            }
          )
        );
        
            passport.authenticate("google", { scope: ["profile","email"] })(req, res);
          }
        
          async callbackGoogle(req, res) {}
}

module.exports = new AuthGoogle();