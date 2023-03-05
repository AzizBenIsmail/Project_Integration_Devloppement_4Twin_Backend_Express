const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String, //unique
  first_Name: String , //min4 max 10
  last_Name: String , //min4 max 10
  email: String , //unique + email valid
  password: String , //8 char /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  created_at: Date , //2017-01-01 type dentre dans postman
  //updated_at: { type: Date, required: false, default: null }, method: 1 
  updated_at: Date, //method: 2
  dateOfBirth: Date , //You must be at least 18 years old
  phoneNumber: Number , //length 8
  gender: String , //oneof (['Male', 'Female', 'Other'])
  userType: String , //oneof (['admin', 'regular', 'fablab'])
  address: String , //min 5 max 15
});

const User = mongoose.model('User', userSchema);

module.exports = User;
