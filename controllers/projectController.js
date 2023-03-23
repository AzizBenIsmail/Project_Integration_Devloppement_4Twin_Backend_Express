const projectModel = require("../models/projectSchema");
const userModel = require("../models/userSchema");

const addproject = async (req, res, next) => {
    try {
      const { idUser } = req.params;
      const { filename } = req.file;
      const {title,description,domaine,goal,numberOfPeople,montant_Final,location} = req.body;
      created_at = new Date();
      const user = await userModel.findById(idUser); // nfas5o bil username
      const project = new projectModel({
        title,description,domaine,goal,numberOfPeople,montant_Final,location,image_project: filename,creator: user,created_at
      });
      

      //console.log('project',project);
      const addedproject = await project.save()
      .then((savedProject) => {
        // find the user by ID
        userModel.findById(idUser)
          .then((user) => {
            // add the project ID to the user's project array
            user.project.push(savedProject._id);
            // save the user to the database
            user.save()
              .then(() => {
                console.log('Project added to user successfully');
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
      //console.log('apres',addeduser);
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
  
  const updateproject = async (req, res, next) => {
    try {
    const {description,domaine,goal,numberOfPeople,montant_Final,location} = req.body;
    console.log(req.body);
    const { id } = req.params;
    const checkIfprojectExists = await projectModel.findById(id);
    if (!checkIfprojectExists) {
     throw new Error("project not found !");
    }
    updated_at = new Date();
    updateedUser = await projectModel.findByIdAndUpdate(
    id,
    {
        $set: {
            description,domaine,goal,numberOfPeople,montant_Final,location
        },
    },
     { new: true }
    );
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
        throw new Error("project not found !");
      }
      await projectModel.findByIdAndDelete(project.id);
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    addproject,
    getprojects,
    deleteproject,
    updateproject,
  };
  