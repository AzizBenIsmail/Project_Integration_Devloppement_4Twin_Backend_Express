const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String,unique: true },
  first_Name: { type: String },
  last_Name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  created_at: { type: Date }, //2017-01-01 type dentre dans postman
  updated_at: { type: Date, }, //2017-01-01 type dentre dans postman
  dateOfBirth: { type: Date }, //2017-01-01 type dentre dans postman
  phoneNumber: { type: Number },
  gender: { type: String },
  userType: { type: String },
  address: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
