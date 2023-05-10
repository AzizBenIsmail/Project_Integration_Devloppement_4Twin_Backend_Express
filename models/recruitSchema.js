const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User=require("./userSchema");
const Application = require("./applicationSchema");

const jobOfferSchema = new Schema({
  
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    aboutCompany: { type: String, required: true },
    aboutJob: { type: String, required: true },
    responsibilities: { type: String, required: true },
    requirements: { type: String, required: true },
    experienceNeeded: { type: String, required: true },
    salary: { type: String, required: true },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }]
  },{timestamps : true }
  );
  
  const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
  
  module.exports = JobOffer;
  