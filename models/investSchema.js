const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("../models/userSchema");
const projectModel = require("../models/projectSchema");


const investSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  titre: String, 
  message: String, 
  created_at: Date, //2017-01-01 type dentre dans postman
  montant: Number, 
  investor: {                //it is a many to one relationship a Invest can have one Investor (User)
    type: mongoose.Schema.Types.ObjectId,   
    ref: 'User',
    required: true 
  },  
  project: {                //it is a many to one relationship a Invest can have one Projet to invest
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true 
  },
});

investSchema.pre('remove', async function(next) {
  try {
    const invest = this;
    const user = await userModel.findOne({ invests: invest._id });
    if (user) {
      user.invests = user.invests.filter(id => id.toString() !== invest._id.toString());
      await user.save();
    }
    const project = await projectModel.findOne({ invests: invest._id });
    if (project) {
      project.montant_actuel=project.montant_actuel - invest.montant;
      project.numberOfPeople_actuel=project.numberOfPeople_actuel-1;
      project.invests = project.invests.filter(id => id.toString() !== invest._id.toString());
      await project.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Invest = mongoose.model("Invest", investSchema);

module.exports = Invest;
