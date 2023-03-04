const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  first_Name: { type: String, required: false },
  last_Name: { type: String, required: false },
  dateOfBirth: { type: Date, required: false }, //2017-01-01 type dentre dans postman
  created_at: { type: Date, required: false, default: null }, //2017-01-01 type dentre dans postman
  updated_at: { type: Date, required: false, default: null }, //2017-01-01 type dentre dans postman
  address: { type: String, required: false },
  phoneNumber: { type: Number, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  userType: { type: String, enum: ['admin', 'regular'], required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;