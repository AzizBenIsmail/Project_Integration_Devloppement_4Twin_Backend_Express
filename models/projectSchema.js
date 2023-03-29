const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("../models/userSchema");

const projectSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title: String, //unique
  description: String, 
  domaine: String, //oneof (['admin', 'regular', 'fablab'])
  goal: String, //oneof (['admin', 'regular', 'fablab'])
  created_at: Date, //2017-01-01 type dentre dans postman
  updated_at: Date, 
  Duration: Date, 
  numberOfPeople: Number, 
  numberOfPeople_actuel : Number, 
  montant_actuel : Number, 
  montant_Final : Number, 
  location: String, 
  image_project: String,
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  creator: {      //it is a many to one relationship a project can have one creator (User)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },  
  invests: [{      //it is a one to many relationship a project can have many Invest
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invest',
    required: false 
  }],
});


projectSchema.pre('remove', async function(next) {
  try {
    const project = this;
    const user = await userModel.findOne({ projects: project._id });
    if (user) {
      user.projects = user.projects.filter(id => id.toString() !== project._id.toString());
      await user.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
