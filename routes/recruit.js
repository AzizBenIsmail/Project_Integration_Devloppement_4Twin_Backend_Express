var express = require("express");
const upload = require("../middlewares/upload");
var router = express.Router();
const auth = require("../middlewares/auth");
const { applyToJobOffer,  searchJob } = require("../controllers/candidateController");
const {
  addJobOffer,
  checkBusinessOwner,
  getApplications,
  getJobOfferOne,
  getSingleJobOffer,
  findJobOffers,
  getCandidates,
  findBusinessOwnerOffers,
  deleteJobOffer,
  deleteCandidate
 
} = require("../controllers/recruitController");
const JobOffer = require("../models/recruitSchema");

/* GET users listing. */
router.get("/listApplications/:jobId", auth, getApplications, (req, res) => {
  res.json(res.jobOffers);
}
);

//router.get("/", getJobOfferOne);

router.get("/job-offers", auth, findJobOffers);

// Route to apply to a job offer
router.post("/apply/:jobId", auth, applyToJobOffer);  // apply hedhy heya submit lakhreneya

// Route to add a job offer
router.post("/add-job-offer", auth, addJobOffer);

// Get a single job offer
// router.get("/get/:id", getJobOfferOne, (req, res) => {
//   res.json(res.jobOffer);
// });

router.get("/getBOO", auth, findJobOffers, checkBusinessOwner, (req, res) => {
  res.json(res.jobOffer);
});

router.get("/findBOOffers/:businessOwnerId", auth, findBusinessOwnerOffers, (req, res) => {
    res.json(res.jobOffers);
  }
);

// Update a job offer
// router.patch(
//   "/update/:id",
//   getJobOffer,
//   checkBusinessOwner,
//   async (req, res) => {
//     try {
//       if (req.body.title) {
//         res.jobOffer.title = req.body.title;
//       }
//       if (req.body.description) {
//         res.jobOffer.description = req.body.description;
//       }
//       if (req.body.company) {
//         res.jobOffer.company = req.body.company;
//       }
//       if (req.body.salary) {
//         res.jobOffer.salary = req.body.salary;
//       }
//       if (req.body.location) {
//         res.jobOffer.location = req.body.location;
//       }
//       const updatedJobOffer = await res.jobOffer.save();
//       res.json(updatedJobOffer);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   }
// );

router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete a job offer 1
// router.delete("/delete/:joId", auth, async (req, res) => {
//   try {
//     const jobOffer = await res.jobOffer.findById(req.params.joId);
//     if (!jobOffer) {
//       return res.status(404).json({ message: "Job offer not found" });
//     }
//     await jobOffer.remove();
//     res.json({ message: "Job offer deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


router.get("/search/jobs", auth, searchJob, (req, res) => {
  res.json(res.jobOffers);
}); 

// Delete a job offer
router.delete("/delete/:joId", auth, deleteJobOffer, (req, res) => {
  res.status(200);
});

// Delete a job offer
router.delete("/deleteCandidate/:caId", auth, deleteCandidate, (req, res) => {
  res.status(200);
});


// if page not found then status = 404 and message ... page not found
router.all("*", (req, res) => {
  res.status(404).send("Page not found!");
});

// get candidates
router.get("/candidates", auth, getCandidates);

module.exports = router;
