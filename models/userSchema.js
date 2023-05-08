const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const passport = require("passport");
const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  appliedOffers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobOffer",
    },
  ],
  username: String, //unique
  first_Name: String, //min4 max 10
  last_Name: String, //min4 max 10
  email: String, //unique + email valid
  password: String, //8 char /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  created_at: Date, //2017-01-01 type dentre dans postman
  //updated_at: { type: Date, required: false, default: null }, method: 1
  updated_at: Date, //method: 2
  enabled: Boolean, //
  dateOfBirth: Date, //You must be at least 18 years old
  phoneNumber: String, //length 8
  phoneNumber1: String,
  gender: String, //oneof (['Male', 'Female', 'Other'])
  userType: String, //oneof (['admin', 'regular', 'fablab'])
  address: String, //min 5 max 15
  image_user: String,
  googleId: String,
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: false },
  ], // one to many relationship a user can have multiple projects
  invests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Invest", required: false },
  ], // one to many relationship a user can have multiple Invest
  inappropriateBehaviorCount: Number,
  favColor:String,
});

userSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
    { ID: user._id },
    process.env.USER_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

userSchema.pre("save", function (next) {
  const user = this;
  userSchema.plugin(findOrCreate);

  user.created_at = new Date();
  user.updated_at = new Date();

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
