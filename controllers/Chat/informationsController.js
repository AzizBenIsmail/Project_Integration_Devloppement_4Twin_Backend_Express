const projectModel = require("../../models/projectSchema");
const userModel = require("../../models/userSchema");
const JobOffer = require("../../models/recruitSchema");


const projectInfo = async (req, res, next) => {
  try {
    const id = await userId(req.body.username);

    const projectQuery = await projectModel
      .find({ creator: id })
      .populate("creator");
    const jobOfferQuery = await JobOffer.find({ businessOwner: id });
    const [projects, jobOffers] = await Promise.all([
      projectQuery,
      jobOfferQuery,
    ]);

    const filteredProjects = projects.filter((project) => project.ecological);

    if (!filteredProjects || filteredProjects.length === 0) {
      throw new Error("No projects found for this creator.");
    }

    res.status(200).json({ projects: filteredProjects, jobOffers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const jobOffer = async (req, res, next) => {
  try {
    const businessOwnerId = await userId(req.body.username);
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

const userId = async (username) => {
  try {
    const user = await userModel.findOne({ username }).lean(); // Find a user by username

    if (!user) {
      throw new Error("User not found!");
    }

    const id = user._id.toString(); // Convert ObjectId to string

    return id;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user ID for message chat");
  }
};

module.exports = {
  projectInfo,
  jobOffer,
};
