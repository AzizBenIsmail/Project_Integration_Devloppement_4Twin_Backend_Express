const projectModel = require('../../models/projectSchema');
const userModel = require('../../models/userSchema');
const projectInfo = async (req, res, next) => {
    try {
        const id=await userId(req.body.username )
      const projects = await projectModel
        .find({ creator: await id})
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


  const userId = async (username) => {
    try {
      const user = await userModel.findOne({ username }).lean(); // Find a user by username
  
      if (!user) {
        throw new Error('User not found!');
      }
  
      const id = user._id.toString(); // Convert ObjectId to string
  
      return id;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get user ID for message chat');
    }
  };


  module.exports = {
    projectInfo
  };
  