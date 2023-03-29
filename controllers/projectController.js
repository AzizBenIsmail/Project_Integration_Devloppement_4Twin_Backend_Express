const projectModel = require("../models/projectSchema");
const userModel = require("../models/userSchema");

const addproject = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const { filename } = req.file;
    const {
      title,
      description,
      domaine,
      goal,
      numberOfPeople,
      montant_Final,
      location,
    } = req.body;
    numberOfPeople_actuel = 0;
    montant_actuel = 0;
    created_at = new Date();
    console.log(req.body);
    const user = await userModel.findById(idUser);
    console.log(user);
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
      image_project: filename,
      creator: user,
      created_at,
    });

    const addedproject = await project
      .save()
      .then((savedProject) => {
        // find the user by ID
        userModel
          .findById(idUser)
          .then((user) => {
            // add the project ID to the user's project array
            user.projects.push(savedProject._id);
            // save the user to the database
            user
              .save()
              .then(() => {
                console.log("Project added to user successfully");
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getprojects = async (req, res, next) => {
  try {
    const projects = await projectModel.find();
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
    if (!project ) {
      throw new Error("projectsnot found !");
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectsByCreator = async (req, res, next) => {
  try {
    const { creatorId } = req.params;
    const projects = await projectModel.find({ creator: creatorId }).populate('creator');
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
      description,
      domaine,
      goal,
      numberOfPeople,
      montant_Final,
      location,
    } = req.body;
    console.log("req", req.body);
    const { id } = req.params;
    const checkIfprojectExists = await projectModel.findById(id);
    if (!checkIfprojectExists) {
      throw new Error("project not found !");
    }
    updated_at = new Date();
    updateedUser = await projectModel.findByIdAndUpdate(id, {
      $set: {
        description,
        domaine,
        goal,
        numberOfPeople,
        montant_Final,
        location,
        updated_at,
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
};
