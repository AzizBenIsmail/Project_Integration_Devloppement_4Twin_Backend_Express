const express = require("express");
const router = express.Router();
const JobOffer = require("../models/recruitSchema");
const auth = require("../middlewares/auth");
const Candidate = require("../models/applicationSchema");
const userModel = require('../models/userSchema')
// Create a new job offer
const addJobOffer = async (req, res) => {
  try {
    const jobOffer = new JobOffer({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      salary: req.body.salary,
      location: req.body.location,
      businessOwner: req.user._id, // Set the business owner to the current user
    });
    const savedJobOffer = await jobOffer.save();
    console.log(req.body);
    res.json(savedJobOffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all job offers//
// const JobOffer = require('../models/jobOffer');

// Middleware to check if the current user is the business owner of the job offer
function checkBusinessOwner(req, res, next) {
  if (res.jobOffer.businessOwner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "You are not authorized to modify or delete this job offer",
    });
  }
  next();
}
// Function to get all applications for a specific job offer
const getJobOffer = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(jobId);

    Candidate.find({jobOffer: jobId }) //userModel.find({appliedOffers: { $in: [jobId] } })
    .then((result)=>{
       res.status(200).json(result)
       console.log(result)
    }
    )
    // const candidates = await userModel.find({appliedOffers: { $in: [jobId] } }); //userModel.find({appliedOffers: { $in: [jobId] } })
    // res.status(200).json(response.candidates)
    // console.log(candidates)
   
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 // userModel.find({appliedOffers: jobId }) //userModel.find({appliedOffers: { $in: [jobId] } })
    // .then((result)=>{
    //    res.status(200).json(result)
    //    console.log(result)
    // }
    // )

const findBusinessOwnerOffers = async (req, res) => {
  try {
    const  businessOwnerId  =  req.user._id;
    const jobOffers = await JobOffer.find({ businessOwner: businessOwnerId });
    if (!jobOffers) {
      return res.status(404).json({ message: "Not owner of any job!" });
    }
    res.status(200).json(jobOffers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteJobOffer = async (req, res) => {
  try {
    const { joId } = req.params;
    //delete collection mongoose express.js
    const deletedJobOffer = await JobOffer.findByIdAndDelete(joId);
    res.status(200).json(deletedJobOffer);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const deleteCandidate = async (req, res) => {
  try {
    const { caId } = req.params;
    //delete collection mongoose express.js
    const deleteCandidate = await Candidate.findByIdAndDelete(caId);
    res.status(200).json(deleteCandidate);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
////////////////////////////////////////////////////////////////
//     const { userId } = req.params;

//     // Find the business owner by ID
//     const businessOwnerId = await JobOffer.businessOwner.findById(userId);

//     if (userId.toString()===jobOffer.businessOwner.toString()){

//      }

//      // Find the job offer by ID
//     const jobOffer = await JobOffer.findById(userId);

//     if (!jobOffer) {
//       return res.status(404).json({ message: 'Job offer not found' });
//     }

//     // Find all applications for the job offer
//     const candidates = await Candidate.find({ jobOffer: jobId });

//     res.status(200).json( candidates );// jobOffer,
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }
// }

const findJobOffers = async (req, res) => {
  try {
    const jobOffers = await JobOffer.find();
    res.status(200).json(jobOffers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
// Function to update application status to approved or declined
const updateJobStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Find the application by ID
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// const getJobOffer = async (req, res) => {
//   try {
//     const jobOffers = await JobOffer.find();
//     res.json(jobOffers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Get a single job offer
// const getJobOfferOne = async (req, res) => {
//   try {
//     const { id } = req.id;
//     const jobOffers = await JobOffer.findById(id);
//     res.json(jobOffers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Middleware to get a single job offer by ID
// async function getSingleJobOffer(req, res, next) {
//   try {
//     const jobOffer = await JobOffer.findById(req.params.id);
//     if (jobOffer == null) {
//       return res.status(404).json({ message: "Job offer not found" });
//     }
//     res.jobOffer = jobOffer;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// const deleteJobOffer = async (req, res) => {
//   try {
//     const deletedJobOffer = await JobOffer.findByIdAndDelete(req.params.id);

//     if (!deletedJobOffer) {
//       return res.status(404).json({ message: 'Job offer not found' })
//     }

//     res.json(deletedJobOffer);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// Define the controller function
const getCandidates = async (req, res) => {
  try {
    // Your code to fetch candidate data from your database
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkBusinessOwner,
  getJobOffer,
  addJobOffer,
  //getJobOfferOne,
  //getSingleJobOffer,
  updateJobStatus,
  findJobOffers,
  getCandidates,
  findBusinessOwnerOffers,
  deleteJobOffer,
  deleteCandidate
};
