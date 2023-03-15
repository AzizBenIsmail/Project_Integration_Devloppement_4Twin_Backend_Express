const User = require("../../models/userSchema.js");
const InvalidCreationException = require("../../exceptions/invalid-credential-exception");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userControllers = require("../userControllers.js");
const { appKey, tokenExpiresIn } = require("../../config/app.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const { addUser } = require("../../controllers/userControllers");
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const secretKey = "6Ld91vkkAAAAACDQJVODT2Om8D_Qg-Dw8cq7d9kG";
class AuthController {


  // async login(req, res) {
  //   const { email, password } = req.body;
  
  //   passport.use(
  //     new LocalStrategy(
  //       {
  //         usernameField: "email",
  //       },
  //       async function verify(email, password, cb) {
  //         const user = await User.findOne({ email });
  
  //         if (!user) {
  //           return cb(null, false, {
  //             message: "Incorrect username or password.",
  //           });
  //         }
  
  //         if (!(await bcrypt.compare(password, user.password))) {
  //           return cb(null, false, {
  //             message: "Incorrect username or password.",
  //           });
  //         }
  
  //         return cb(null, user);
  //       }
  //     )
  //   );
  
  //   passport.authenticate("local", async function (err, user, info) {
  //     if (err) {
  //       return console.error(err);
  //     }
  //     if (!user) {
  //       console.log("Incorrect username or password");
  //       return res.status(401).json({ message: "Incorrect username or password" });
  //     }
  //     console.log("User successfully authenticated");
  //     const session = {
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //     };
  
  //     const token = await jwt.sign(session, process.env.JWT_SECRET, {
  //       expiresIn: "1h",
  //     });
  //     res.cookie("token", token, { httpOnly: true });
  
  //     // Check if user is authenticated before sending response
  //     req.isAuthenticated() ? 
  //       res.status(200).json({ message: "User successfully authenticated", user: session }) :
  //       res.redirect("/users/test");
  //   })(req, res);
  // }

 
  // Define the login route
  async  login(req, res) {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async function verify(email, password, done) {
          try {
            // Find the user in the database by their email
            const user = await User.findOne({ email });
            if (!user) {
              // If no user is found, return an error message
              return done(null, false, { message: "Incorrect email or password." });
            }
            // Compare the provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
              // If the passwords match, return the user object
              return done(null, user);
            } else {
              // If the passwords don't match, return an error message
              return done(null, false, { message: "Incorrect email or password." });
            }
          } catch (err) {
            // If there is an error, return the error message
            return done(err);
          }
        }
      )
    );
    
    // Call the authenticate function with the local strategy
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        // If there is an error, return the error message
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        // If no user is found, return an error message
        return res.status(401).json({ message: "Incorrect email or password." });
      }
      // If the user is found, log them in using req.login
      req.login(user, function (err) {
        if (err) {
          // If there is an error, return the error message
          return res.status(500).json({ message: err.message });
        }
        // If there is no error, return the user object
        return res.status(200).json({ message: "User successfully authenticated", user });
      });
    })(req, res);
  }
    //     const { email, password } = req.body;

    //     // find the user with mongo
    // const u = await User.findOne({
    //   email,
    // });

    //     //check if user's email is right
    //     if (!u)
    //     return res.status(403).send("Invalid login credentials");

    //     //check if user's password is correct

    //    // if (password !== u.password)

    //    if(!await bcrypt.compare(password, u.password))
    //       return res.status(403).send("Invalid login credentials");

    // //part2
    //       const payload = {id : u.id, email : u.email, username: u.username, first_name: u.first_Name, last_name: u.last_Name};
    //       const accessToken = jwt.sign(payload,appKey,{expiresIn: tokenExpiresIn})
    //       res.send({u,...{accessToken}});
    // //////////////////////////////

    //       console.log(u);
    //      //res.send(u);
  
    async verifyRecaptcha(req,res,next){
    
      if(!req.body.captcha){
        return res.json({"msg":"Captcha is not checked"});
       
    }
  
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;
  
    request(verifyUrl,(err,response,body)=>{
        if(err){
            console.log(err); 
        }
        body = JSON.parse(body);
        
        if(!body.success || body.success <0.3){
            return res.json({"msg":"captcha verification failed", "score":body.score});
        }
            // return json message or continue with your function. Example: loading new page, ect
        return res.json({"msg":"captcha verification passed", "score": body.score});
        next();
    });
    
  }
  
  async register(req, res) {
    const { filename } = req.file;
    console.log('filename',req.file);
    const {username,password,email,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType}=req.body;
    //const user = new User();
    const user=new User({username,password,email,first_Name,last_Name,dateOfBirth,address,phoneNumber,gender,userType,image_user :filename});

  //  user.email = email;
  //   user.password = password;
    

    //userControllers.addUser(user);

    //     User.register({username:req.body.email }, req.body.password, function(err, user) {
    //       if (err) {
    //         console.log('testttt error')
    //         console.log(user);
    //         res.send(user);
    //        }

    //        else{
    //         passport.authenticate("local")(req, res, ()=>{
    //           console.log("testt")
    // console.log(user);
    //           res.send(user);

    //         }  )

    //         //  console.log( res.redirect('../test'));

    //        }

    //       // console.log(user);

    //    } );
    console.log(req.body);


    try {
      await user.save();
      const { email } = req.body;
      // Check we have an email
      if (!email) {
        return res.status(422).send({ message: "Missing email." });
      }
      try {
        // Check if the email is in use
        //    const existingUser = await User.findOne({ email }).exec();
        //    if (existingUser) {
        //       return res.status(409).send({
        //             message: "Email is already in use."
        //       });
        //    }
        // Step 2 - Generate a verification token with the user's ID
        const verificationToken = user.generateVerificationToken();
        // Step 3 - Email the user a unique verification link
        const url = `http://localhost:5000/api/verify/${verificationToken}`;
        transporter.sendMail({
          to: email,
          subject: "Verify Account",
          html: `Click <a href = '${url}'>here</a> to confirm your email.`,
        });
        passport.authenticate("local")(req, res, function () {
          res.redirect("/users/test");
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving user to database");

      res.redirect("/users/register");
    }
  }

  async logout(req, res) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/users/test");
    });
  }

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
              username: profile.displayName,
              first_Name: profile.given_name,
              last_Name: profile.family_name,
              email: profile.emails[0].value,
              image_user: profile.photos[0].value,
            });
            await newUser.save();
            done(null, newUser);
          } catch (err) {
            done(err, false);
          }
        }
      )
    );

    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  }

  async callbackGoogle(req, res) {}

  async verify(req, res) {
    const { token } = req.params;
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }
    // Step 1 -  Verify the token from the URL
    let payload = null;
    try {
      payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
    } catch (err) {
      return res.status(500).send(err);
    }
    try {
      // Step 2 - Find user with matching ID
      const user = await User.findOne({ _id: payload.ID }).exec();
      if (!user) {
        return res.status(404).send({
          message: "User does not  exists",
        });
      }
      // Step 3 - Update user verification status to true
      user.verified = true;
      await user.save();
      return res.status(200).send({
        message: "Account Verified",
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = new AuthController();
