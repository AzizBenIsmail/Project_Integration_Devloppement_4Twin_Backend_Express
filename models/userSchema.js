const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const session = require('express-session');
const passport = require('passport');
const userSchema = new Schema({
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
  phoneNumber: Number, //length 8
  gender: String, //oneof (['Male', 'Female', 'Other'])
  userType: String, //oneof (['admin', 'regular', 'fablab'])
  address: String, //min 5 max 15
  image_user: String,
});

userSchema.pre("save", function (next) {
  const user = this;
  user.enabled = true;
user.created_at = new Date();
user.updated_at = new Date();
  if (!user.isModified("password")) {
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
