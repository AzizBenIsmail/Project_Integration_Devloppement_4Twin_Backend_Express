const mongoose = require('mongoose');
const { boolean } = require('yup');
const Schema = mongoose.Schema;
const User=require("../models/userSchema");



const eventSchema = new Schema({

    title: String,
    description: String,   
    start_date:  Date, 
    end_date: Date,
    event_img: String ,
    state : Boolean,  
    //categorie :[]
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    interestedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },{timestamps : true }
  );
  
  const Event = mongoose.model('Event', eventSchema);
  
  module.exports = Event;