const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const investSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  message: String, 
  created_at: Date, //2017-01-01 type dentre dans postman
  montant: number, 
  creator: {                //it is a many to one relationship a Invest can have one Investor (User)
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

const Invest = mongoose.model("Invest", investSchema);

module.exports = Invest;
