var express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");
const JobOffer = require("../models/recruitSchema");
const LinkedIn = require("node-linkedin-v2");
const passport = require("passport");
const fs = require('fs');
const PDFParser = require('pdf-parse');
//const express = require('express');
const multer = require("multer");
const app = express();
//const upload = multer({ dest: "public/resumes" }); // specify the directory to store the uploaded files
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const {
  applyToJobOffer,
  searchJob,
} = require("../controllers/candidateController");
const {
  pdfToText,
} = require("../controllers/candidateDataController");
const upload = require("../middlewares/uploadFile");
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
  deleteCandidate,
  //getLinkedInProfileData,
} = require("../controllers/recruitController");

// router.post('/', upload, (req, res) => {
//    const file = req.file.filename;
//    const newImage = {file-demo : file}
//    try{
//      await newImage.save();
//      res.status(201).json(newimage );
//    }catch(error){
//      res.status(409).json({ message: error.message });0
//    }

// });

// Route to apply to a job offer
 router.post("/apply/:jobId", auth, upload.single("resume"), applyToJobOffer);
//, (req, res) => {
//   const {file} = req.file.filename;
//   const newImage = {file-demo : file}
//   try{
//     await newImage.save();
//     res.status(201).json(newImage );
//   }catch(error){
//     res.status(409).json({ message: error.message });
//   }

//});// apply hedhy heya submit lakhreneya

//router.get("/pdfToText", pdfToText);
router.get('/convert-pdf-to-text', (req, res) => {
  const pdfBuffer = fs.readFileSync(pdfPath);
  pdfToText(pdfBuffer)
    .then((text) => {
      res.send(text);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error converting PDF to text');
    });
});
/* GET users listing. */
router.get("/listApplications/:jobId", getApplications)//, (req, res) => {
  //res.status(200).json( jobOffer ); //{ totalScores, results }
//});

//upload cv
// router.post("/upload/:caId", auth, upload.single("resume"), (req, res) => {
//   const file = req.file; // the uploaded file object
//   const fileName = `${req.params.caId}-${file.originalname}`; // generate a unique file name

//   // your code for processing the uploaded file here, e.g. pass it to an NLP library
//   // to extract relevant information and score the candidate

//   // save the uploaded file to a directory on the server
//   const filePath = path.join(__dirname, "../public/resumes", fileName);
//   fs.writeFile(filePath, file.buffer, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "File upload failed" });
//     }
//     res.json({ message: "File uploaded successfully" });
//   });
// });

//router.get("/", getJobOfferOne);

router.get("/job-offers", auth, findJobOffers);

// Route to add a job offer
router.post("/add-job-offer", auth, addJobOffer);

router.get("/getBOO", auth, findJobOffers, checkBusinessOwner, (req, res) => {
  res.json(res.jobOffer);
});

router.get(
  "/findBOOffers/:businessOwnerId",
  auth,
  findBusinessOwnerOffers,
  (req, res) => {
    res.json(res.jobOffers);
  }
);

// router.get("/getLinkedin", getLinkedInProfileData, (req, res) => {
//   res.status(200).json(profileData);
// });

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

// passport.use(new LinkedInStrategy({
//   clientID: '78ojl56idue60w',
//   clientSecret: 'tCXizvPO3OsKhP4d',
//   callbackURL: '/apply/:jobId',
//   scope: ['r_liteprofile', 'r_emailaddress']
// }, (accessToken, refreshToken, profile, done) => {
//   // Use the access token to make API requests
//   const linkedinApi = new LinkedInApi({ accessToken });
//   linkedinApi.getLiteProfile().then(profileData => {
//     const name = `${profileData.localizedFirstName} ${profileData.localizedLastName}`;
//     const currentJobTitle = profileData.positions ? profileData.positions.values[0].title : '';
//     const fieldOfStudy = profileData.educations ? profileData.educations.values[0].fieldOfStudy : '';
//     const currentJobStartDate = profileData.positions ? profileData.positions.values[0].startDate : '';
//     const yearsOfExperience = currentJobStartDate ? new Date().getFullYear() - new Date(currentJobStartDate.year, currentJobStartDate.month).getFullYear() : '';
//     const address = profileData.location ? profileData.location.name : '';

//     // Display the form to the user
//       // ...
//   }).catch(error => {
//       // Handle the error
//       // ...
//   });
// }));

// // Create the authentication route
// router.get('/auth/linkedin', passport.authenticate('linkedin'));

// // Create the callback route
// router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//     successRedirect: '/profile',
//     failureRedirect: '/login'
// }));

module.exports = router;

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

// Get a single job offer
// router.get("/get/:id", getJobOfferOne, (req, res) => {
//   res.json(res.jobOffer);
// });
