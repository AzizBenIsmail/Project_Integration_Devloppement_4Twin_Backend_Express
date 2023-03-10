const mongoose = require('mongoose');
const { boolean } = require('yup');
const Schema = mongoose.Schema;

const fablabRequestSchema = new Schema({
  fablabName: String, //unique
  fablabEmail: String, //unique + email valid
  dateOfCreation: Date, //You must be at least 18 years old
  phoneNumber: Number, //length 8
  address: String, //min 5 max 15
  fablbLogo: String,
  description : String,
  is_treated : Boolean,
  is_accepted:Boolean,
}
,{timestamps : true }
);

const fablabRequest = mongoose.model('fablabRequest', fablabRequestSchema);

module.exports = fablabRequest;
