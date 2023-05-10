const express = require("express");
const router = express.Router();
const JobOffer = require("../models/recruitSchema");
const auth = require("../middlewares/auth");
const Application = require("../models/applicationSchema");
const request = require("request");
const cheerio = require("cheerio");
const nlp = require("node-nlp");
const fs = require("fs");
const pdf = require("pdf-parse");
//const franc = require('franc');
const translate = require("@vitalets/google-translate-api");
const natural = require("natural");
const { WordNet } = natural;
const tokenizer = new natural.WordTokenizer();
const stopwords = require("stopwords").english;
const stopwordsF = require("stopwords").french;
const stemmer = natural.PorterStemmer;
const { SentimentAnalyzer, PorterStemmer } = require("natural");
const TfIdf = natural.TfIdf;
const vectorizer = new TfIdf();
// const euclideanDistance = require('ml-distance').euclidean;
const distance = require("euclidean-distance");

const userModel = require('../models/userSchema');
const { addXP2 } = require("./evaluationController");
const BadgesModel = require("../models/badgesSchema");

// Create a new job offer
const addJobOffer = async (req, res) => {
  try {
    const jobOffer = new JobOffer({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      aboutCompany: req.body.aboutCompany,
      aboutJob: req.body.aboutJob,
      responsibilities: req.body.responsibilities,
      requirements: req.body.requirements,
      experienceNeeded: req.body.experienceNeeded,
      salary: req.body.salary,
      businessOwner: req.user._id, // Set the business owner to the current user
    });

    const user = await userModel.findById(req.user._id);

    const badge = new BadgesModel({
      usernameB: user.username,
      badgeName: "NEW JOB",
      badgeDescription: "Awarded to individuals who successfully create a new field of work, demonstrating their innovation, creativity, and dedication..",
      badgeImg: "job.png",
      etat:false,
      details:req.body.description,   
           vu:false,

    });
    const addedBadge = await badge.save();
addXP2(user.username,20);

    const savedJobOffer = await jobOffer.save();
    console.log(req.body);
    res.json(savedJobOffer);



  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const scoreCandidate = async (jobOfferId, candidate) => {
//   // Load job offer requirements
//   const jobOffer = await JobOffer.findById(jobOfferId);
//   const requirements = jobOffer.requirements;

//   // Preprocess job offer requirements and candidate data
//   const preprocessedRequirements = nlp
//     .text(requirements)
//     .toLowerCase()
//     .removeWords(nlp.stopwords.all)
//     .terms()
//     .out("array");

//   const preprocessedCandidate = nlp
//     .text(candidate.resume)
//     .toLowerCase()
//     .removeWords(nlp.stopwords.all)
//     .terms()
//     .out("array");

//   // Extract features
//   const jobOfferFeatures = nlp.bow(preprocessedRequirements);
//   const candidateFeatures = nlp.bow(preprocessedCandidate);

//   // Calculate similarity
//   const similarityScore = nlp.sentenceSimilarity(
//     preprocessedRequirements.join(" "),
//     preprocessedCandidate.join(" ")
//   );

//   // Calculate candidate's score
//   const experienceScore = candidate.yearsOfExperience * 10;
//   const educationScore = candidate.educationLevel * 5;
//   const similarityWeight = 50;
//   const finalScore =
//     experienceScore + educationScore + similarityScore * similarityWeight;

//   return finalScore;
// };

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
const getApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(jobId);

    const jobOffer = await JobOffer.findById(jobId).populate("applications");
    const jobRequirements = jobOffer.requirements;

    const natural = require("natural");

    jobOffer.applications.forEach((application) => {
      if (application.resume) {
        const dataBuffer = fs.readFileSync(
          `public/resumes/${application.resume}`
        );
        pdf(dataBuffer).then(async function (data) {
          const text = data.text.toString();

          // Remove all characters that don't match the pattern, and replace line breaks with spaces
          let cleanedText = text
            .replace(/[^\w\sÀ-ÿ]/g, "")
            .replace(/\n/g, " ")
            .toLowerCase(); //(/[\W_]/g, ' ').replace(/\s+/g, ' ')
          console.log("cleanedText: ", cleanedText);

          // Remove all characters that don't match the pattern, and replace line breaks with spaces
          let cleanedRequirements = jobRequirements
            .replace(/[^\w\sÀ-ÿ]/g, "")
            .replace(/\n/g, " ")
            .toLowerCase();
          console.log("cleanedRequirements: ", cleanedRequirements);

          //Tokenize the text   ['','','']
          let tokens = tokenizer.tokenize(cleanedText);

          // Tokenize the requirements
          let jobDescriptions = tokenizer.tokenize(cleanedRequirements);

          //Remove stop words
          tokens = tokens.filter((token) => !stopwords.includes(token));
          console.log("tokens : ", tokens);

          //Remove stop words for requirements
          jobDescriptions = jobDescriptions.filter(
            (jobDescription) => !stopwords.includes(jobDescription)
          );
          console.log("jobDescriptions : ", jobDescriptions);

          // Create a new SentimentAnalyzer object with English language and AFINN sentiment lexicon
          const analyzer = new SentimentAnalyzer(
            "English",
            PorterStemmer,
            "afinn"
          );
          const sentimentResult = analyzer.getSentiment(tokens);
          console.log(sentimentResult);

          const formattedTokens = [tokens.join(", ")];

          const formattedJobDescriptions = [jobDescriptions.join(", ")];

          const matchedWords = [];

          jobDescriptions.forEach((word) => {
            const pattern = new RegExp(`\\b${word}\\b`, "i");
            if (pattern.test(formattedTokens)) {
              matchedWords.push(word);
            }
          });
          console.log("jobDescriptions: ", jobDescriptions);

          console.log("matchedWords:", matchedWords);
          const formattedMatchedWords = [matchedWords.join(", ")];

          console.log("formattedMatchedWords: ", formattedMatchedWords);
          console.log("formattedJobDescriptions: ", formattedJobDescriptions);

          // Calculate the Jaro-Winkler distance between each job requirement and each keyword in the candidate's resume
          let totalScore = 0;
          for (let i = 0; i < formattedJobDescriptions.length; i++) {
            for (let j = 0; j < formattedMatchedWords.length; j++) {
              const score = natural.JaroWinklerDistance(
                formattedJobDescriptions[i],
                formattedMatchedWords[j],
                { ignoreCase: true }
              );
              totalScore += score;
            }
          }
          console.log("Jaro-Winkler distance:", totalScore);
          const updateApp = await Application.findByIdAndUpdate(
            application._id,
            {
              $set: {
                score: totalScore,
                sentimentScore: sentimentResult,
              },
            },
            { new: true }
          );
        });
      }
    });
    const jobOfferUpdate = await JobOffer.findById(jobId).populate(
      "applications"
    );

    res.status(200).json(jobOfferUpdate); //, totalScores, results
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // Perform stemming
// natural.PorterStemmer.tokenizeAndStem
// tokens = tokens.map(token => stemmer.stem(token));
// console.log("tokens : ", tokens);
// Initialize the lemmatizer
// const lemmatizer = new natural.Lemmatizer();

// // Perform lemmatization
// tokens = tokens.map(token => {
//   return lemmatizer.lemmatize(token);
// });
// Perform lemmatization
// const wordnet = new natural.WordNet();
// tokens = tokens.map((token) => {
//   wordnet.lookup(token, (result) => {
//     const lemmas = result && result.length > 0 ? result[0] : token;
//     return lemmas;
//   });
// });

// Join the tokens back into a single string
//let processedData = tokens.join(" ");

// An example job description with required skills
// const jobDescription = 'sql, java, plsql, js, django, python, react, expressjs';

// // An example candidate's resume
// const candidateResume = 'sql, java, plsql, js, django';

// // Split job requirements into individual words
// const jobRequirements = jobDescription.split(' ');

// // Split candidate's resume into individual words
// const resumeKeywords = candidateResume.split(' ');

// // Calculate the Jaro-Winkler distance between each job requirement and each keyword in the candidate's resume
// let totalScore = 0;
// for (let i = 0; i < jobRequirements.length; i++) {
//   for (let j = 0; j < resumeKeywords.length; j++) {
//     const score = natural.JaroWinklerDistance(jobRequirements[i], resumeKeywords[j], { ignoreCase: true });
//     totalScore += score;
//   }
// }

// // Calculate the average score
// const averageScore = totalScore / (jobRequirements.length * resumeKeywords.length);

// console.log(`The score between job requirements and candidate's resume is ${averageScore}`);

/////////////////////////////////////     EUCLIDEAN DISTANCE     /////////////////////////////////////
// Create a new TF-IDF vectorizer
// const vectorizer = new natural.TfIdf();

// // Add job requirements to the vectorizer
// vectorizer.addDocument(jobDescriptions);

// // Add candidate's resume to the vectorizer
// vectorizer.addDocument(tokens);

// // Get the TF-IDF vectors for job requirements and candidate's resume
// const jobRequirementsVector = vectorizer.listTerms(0);
// const candidateResumeVector = vectorizer.listTerms(1);
// // Extract the tf-idf values of each term from the vectors
// const jobRequirementsTfidf = jobRequirementsVector.map(term => term.tfidf);
// const candidateResumeTfidf = candidateResumeVector.map(term => term.tfidf);

// // Calculate the Euclidean distance between the two vectors
// //const eucDistance = distance(jobRequirementsTfidf, candidateResumeTfidf);

// const eucDistance = distance([20,30,40], [20,30,40,15,25,35]);

// Calculate the Euclidean distance between the two vectors
//const Eucdistance = distance(jobRequirementsVector, candidateResumeVector);
//let Eucdistance = jobRequirementsVector.map(obj => distance(candidateResumeVector, obj));

// const getLinkedInProfileData = async (req, res) => {
//   try {
//     const { profileUrl } = req.body;

//     await scrapeLinkedInProfile(profileUrl);

//     res.status(200).json({ message: 'Successfully scraped LinkedIn profile' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const scrapeLinkedInProfile = async (profileUrl) => {
//   return new Promise((resolve, reject) => {
//     request({ uri: profileUrl, method: 'GET' }, (error, response, html) => {
//       if (error) {
//         reject(new Error('Failed to scrape LinkedIn profile'));
//       } else {
//         const $ = cheerio.load(html);
//         const experience = $('.experience-section .pv-profile-section__card-item-v2');
//         const education = $('.education-section .pv-profile-section__card-item-v2');
//         const certifications = $('.certifications-section .pv-profile-section__card-item-v2');
//         const skills = $('.pv-skill-categories-section .pv-skill-category-entity__skill-wrapper');

//         console.log('Years of experience:');
//         experience.each((i, el) => {
//           const jobTitle = $(el).find('.pv-entity__summary-info h3').text().trim();
//           const jobDuration = $(el).find('.pv-entity__summary-info .pv-entity__bullet-item-v2').eq(1).text().trim();
//           console.log(`${jobTitle}: ${jobDuration}`);
//         });

//         console.log('Education:');
//         education.each((i, el) => {
//           const degree = $(el).find('.pv-entity__degree-name').text().trim();
//           const field = $(el).find('.pv-entity__fos').text().trim();
//           console.log(`${degree} in ${field}`);
//         });

//         console.log('Certifications:');
//         certifications.each((i, el) => {
//           const name = $(el).find('.pv-certification-name').text().trim();
//           const issuingOrg = $(el).find('.pv-certification-issuing-authority').text().trim();
//           console.log(`${name} - ${issuingOrg}`);
//         });

//         console.log('Skills:');
//         skills.each((i, el) => {
//           const skill = $(el).find('.pv-skill-category-entity__name').text().trim();
//           console.log(skill);
//         });

//         resolve();
//       }
//     });
//   });
// };

// const getProfileData = async (req, res) => {
//   try {
//     const profileUrl  = encodeURI('https://www.linkedin.com/in/asma-ben-khalfallah-أسماء-بن-خلف-الله-55b811134/'); //req.params;
//     const profileData = await extractProfileData(profileUrl);
//     res.status(200).json(profileData);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const extractProfileData = (profileUrl) => {
//   return new Promise((resolve, reject) => {
//     request(profileUrl, (error, response, html) => {
//       if (error) {
//         reject(error);
//         return;
//       }

//       if (response.statusCode !== 200) {
//         reject(`Status code ${response.statusCode}`);
//         return;
//       }

//       const $ = cheerio.load(html);

//       const experience = $('.experience-section .pv-profile-section__card-item-v2');
//       const education = $('.education-section .pv-profile-section__card-item-v2');
//       const certifications = $('.certifications-section .pv-profile-section__card-item-v2');
//       const skills = $('.pv-skill-categories-section .pv-skill-category-entity__skill-wrapper');

//       const profileData = {
//         experience: [],
//         education: [],
//         certifications: [],
//         skills: [],
//       };

//       experience.each((i, el) => {
//         const jobTitle = $(el).find('.pv-entity__summary-info h3').text().trim();
//         const jobDuration = $(el).find('.pv-entity__summary-info .pv-entity__bullet-item-v2').eq(1).text().trim();

//         profileData.experience.push({
//           jobTitle,
//           jobDuration,
//         });
//       });

//       education.each((i, el) => {
//         const degree = $(el).find('.pv-entity__degree-name').text().trim();
//         const field = $(el).find('.pv-entity__fos').text().trim();

//         profileData.education.push({
//           degree,
//           field,
//         });
//       });

//       certifications.each((i, el) => {
//         const name = $(el).find('.pv-certification-name').text().trim();
//         const issuingOrg = $(el).find('.pv-certification-issuing-authority').text().trim();

//         profileData.certifications.push({
//           name,
//           issuingOrg,
//         });
//       });

//       skills.each((i, el) => {
//         const skill = $(el).find('.pv-skill-category-entity__name').text().trim();

//         profileData.skills.push({
//           skill,
//         });
//       });

//       resolve(profileData);
//     });
//   });
// };

//JobOffer.find({ _id: jobId })
//userModel.find({appliedOffers: { $in: [jobId] } })
// .then((result)=>{
//    res.status(200).json(result)
//    console.log(result)
// }
// )
// const candidates = await userModel.find({appliedOffers: { $in: [jobId] } }); //userModel.find({appliedOffers: { $in: [jobId] } })
// res.status(200).json(response.candidates)
// console.log(candidates)

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// userModel.find({appliedOffers: jobId }) //userModel.find({appliedOffers: { $in: [jobId] } })
// .then((result)=>{
//    res.status(200).json(result)
//    console.log(result)
// }
// )

const findBusinessOwnerOffers = async (req, res) => {
  try {
    const businessOwnerId = req.user._id;
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
};
const deleteCandidate = async (req, res) => {
  try {
    const { caId } = req.params;
    //delete collection mongoose express.js
    const deleteCandidate = await Candidate.findByIdAndDelete(caId);
    res.status(200).json(deleteCandidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
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
  getApplications,
  addJobOffer,
  //getJobOfferOne,
  //getSingleJobOffer,
  updateJobStatus,
  findJobOffers,
  getCandidates,
  findBusinessOwnerOffers,
  deleteJobOffer,
  deleteCandidate,
  //getProfileData,
  // scrapeLinkedInProfile,
  // getLinkedInProfileData,
  //scoreCandidate,
};
