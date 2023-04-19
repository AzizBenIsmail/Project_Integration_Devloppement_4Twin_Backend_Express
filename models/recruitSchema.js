const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User=require("./userSchema");

const jobOfferSchema = new Schema({
  
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    candidates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },{timestamps : true }
  );
  
  const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
  
  module.exports = JobOffer;
  