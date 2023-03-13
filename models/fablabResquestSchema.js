const mongoose = require('mongoose');
const { boolean } = require('yup');
const Schema = mongoose.Schema;

const fablabRequestSchema = new Schema({
  fablabName: String, 
  fablabEmail: String, 
  dateOfCreation: Date, 
  phoneNumber: String, 
  address: String, 
  fablbLogo: String,
  description : String,
  is_treated : Boolean,
  is_accepted:Boolean,
}
,{timestamps : true }
);

const fablabRequest = mongoose.model('fablabRequest', fablabRequestSchema);

module.exports = fablabRequest;
