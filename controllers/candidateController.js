const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema");
const Application = require("../models/applicationSchema");
const JobOffer = require("../models/recruitSchema");
const applyToJobOffer = async (req, res) => {
  try {
  const {jobId} = req.params;
  const { firstName, lastName, email, phone, availability, adresse, resume } = req.body;
  const application = new Application({
    firstName,
    lastName,
    email,
    phone,
    availability,
    adresse,
    resume,
  });
  const savedApplication = await application.save();
  const jobOffer = await JobOffer.findById(jobId);

  jobOffer.applications.push(savedApplication._id);
  await jobOffer.save();

  res.json(savedApplication);




  




} catch (err) {
  res.status(500).json({ message: err.message });
}
};
 
const searchJob = async (req, res) => {
  const { title } = req.query;

  try {
    const jobOffers = await JobOffer.find({ title: { $regex: title, $options: "i" } });
    res.status(200).json(jobOffers);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  applyToJobOffer,
  searchJob
};

 //const { _id } = req.user;



//   try {
//     // Check if jobOfferId is provided
//     if (!jobOfferId) {
//       return res.status(400).json({ error: "Job offer ID is required" });
//     }

//     // Check if jobOfferId is a valid ObjectId value
//     if (!mongoose.Types.ObjectId.isValid(jobOfferId)) {
//       return res.status(400).json({ error: "Invalid job offer ID" });
//     }
//     JobOffer.findById(jobOfferId).then(async (jobOffer) => {
//       if (jobOffer.businessOwner.toString() === req.user._id.toString()) {
//         return res.status(500).json({
//           error: "Business owner cannot submit to jobOffer",
//         });
//       }
    
      
//       userModel
//         .findByIdAndUpdate(req.user._id, { jobOffer: [jobOffer.id] })
//         .then((result) => console.log(result));
//       JobOffer.findByIdAndUpdate(jobOffer.id, { candidates: [req.user._id] })
//     });

//     // Check if the jobOfferId corresponds to an existing JobOffer document

//     /*
//     const candidate = new Candidate({
//       jobOffer: jobOffer._id,
//       candidate: req.user._id,
//       resume,
//       firstName, 
//       lastName,
//       email,
//       phone,
//       availability,
//       adresse,
//       //status: 'pending'
//     });*/
//     const application = new Application({
//       jobOffer: jobOfferId,
//       resume,
//       firstName,
//       lastName,
//       email,
//       phone,
//       availability,
//       adresse,
//     });
//     await application.save();
//     //const savedCandidates = await candidate.save();
//     res.status(201).json({ message: "Application submitted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// const express = require("express");
// const router = express.Router();
// const Candidate = require('../models/applicationSchema');

// const applyToJobOffer = async (req, res) => {
//   //const { jobOfferId, candidateId, resume, firstName, lastName, email, phone, availability } = req.body;

//   try {
//     // Check if jobOfferId is provided
//     if (!jobOfferId) {
//       return res.status(400).json({ error: 'Job offer ID is required' });
//     }

//     // Check if jobOfferId is a valid ObjectId value
//     if (!mongoose.Types.ObjectId.isValid(jobOfferId)) {
//       return res.status(400).json({ error: 'Invalid job offer ID' });
//     }

//     // Check if the jobOfferId corresponds to an existing JobOffer document
//     const jobOffer = await JobOffer.findById(jobOfferId);
//     if (!jobOffer) {
//       return res.status(404).json({ error: 'Job offer not found' });
//     }

//     const candidate = new Candidate({
//       jobOffer: req.jobOffer.,
//       candidate: req.user._id,
//       resume:req.body.resume,
//       firstName,
//       lastName,
//       email,
//       phone,
//       availability,
//       status: 'pending'
//     });

//     const savedCandidates = await candidate.save();
//     res.status(201).json({ message: 'Application submitted successfully', candidate: savedCandidates });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//     applyToJobOffer,
// }


