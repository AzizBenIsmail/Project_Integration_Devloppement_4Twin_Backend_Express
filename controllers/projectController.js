const projectModel = require("../models/projectSchema");
const userModel = require("../models/userSchema");
const isProjectEcological = require("../middlewares/isProject");
const BadgesModel = require("../models/badgesSchema")

const addproject = async (req, res, next) => {
  try {
    const idUser = req.user._id;
    const { filename } = req.file;
    const {
      title,
      description,
      domaine,
      goal,
      numberOfPeople,
      montant_Final,
      location,
      Duration,
    } = req.body;

    let numberOfPeople_actuel = 0;
    let montant_actuel = 1;
    const created_at = new Date();

    // Call the isProjectEcological function to determine if the project is ecological
    const isEcological = await isProjectEcological(description);

    const user = await userModel.findById(idUser);

    const project = new projectModel({
      title,
      description,
      domaine,
      goal,
      numberOfPeople,
      numberOfPeople_actuel,
      montant_actuel,
      montant_Final,
      location,
      Duration,
      image_project: filename,
      creator: user,
      created_at,
      ecological: isEcological,
    });

    const savedProject = await project.save();

    // find the user by ID
    const foundUser = await userModel.findById(idUser);

    // add the project ID to the user's project array
    foundUser.projects.push(savedProject._id);

    // save the user to the database
    await foundUser.save();

    console.log("Project added to user successfully");

    res.status(200).json(project);


    //ajout xp 
    //badges add
    const badge = new BadgesModel({
      usernameB: user.username,
      badgeName: "NEW PROJECT",
      badgeDescription: project.description,
      badgeImg: "project.jpg",
    });
    const addedBadge = await badge.save();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getprojects = async (req, res, next) => {
  try {
    const projects = await projectModel.find({ ecological: true });
    if (!projects || projects.length === 0) {
      throw new Error("projects not found !");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getproject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    console.log(project);
    if (!project) {
      throw new Error("projectsnot found !");
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectsByCreator = async (req, res, next) => {
  try {
    const projects = await projectModel
      .find({ creator: req.user._id })
      .populate("creator");
    console.log(projects);
    if (!projects || projects.length === 0) {
      throw new Error("No projects found for this creator.");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectsValider = async (req, res, next) => {
  try {
    const projects = await projectModel.find({ verified: true });
    console.log(projects);
    if (!projects || projects.length === 0) {
      throw new Error("No projects found for this creator.");
    }
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateproject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      domaine,
      goal,
      Duration,
      numberOfPeople,
      montant_Final,
      location,
    } = req.body;
    console.log("req", req.body);
    const { id } = req.params;
    console.log("id", id);
    // Call the isProjectEcological function to determine if the project is ecological
    const isEcological = await isProjectEcological(description);
    const checkIfprojectExists = await projectModel.findById(id);
    if (!checkIfprojectExists) {
      throw new Error("project not found !");
    }
    updated_at = new Date();
    updateedUser = await projectModel.findByIdAndUpdate(id, {
      $set: {
        title,
        description,
        domaine,
        goal,
        Duration,
        numberOfPeople,
        montant_Final,
        location,
        updated_at,
        ecological: isEcological,
      },
    });
    res.status(200).json(updateedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteproject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    await project.remove();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addproject,
  getprojects,
  getProjectsByCreator,
  getproject,
  deleteproject,
  updateproject,
  getProjectsValider,
};
