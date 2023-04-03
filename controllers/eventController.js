const eventModel = require("../models/eventSchema");
const userModel = require("../models/userSchema");

const addEvent = async(req,res,next) => {
    try {
        const { filename } = req.file;
        const{title,
            description,   
            start_date, 
            end_date,
            creator}=req.body;
        const event = new eventModel({title,description,start_date, end_date,creator,event_img:filename,state:"true"});
        const addedEvent = await event.save();
        res.status(200).json(addedEvent);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateEvent = async(req,res,next) => {
    try {
        const { id } = req.params;
        const { filename } = req.file || {};
        const{title,
            description,   
            start_date, 
            end_date,
            creator,
            userId}=req.body;
        const checkIfEventExists = await eventModel.findById(id);
        if (!checkIfEventExists){
            throw new Error("event not found !");
        }
        const updatedEvent = await eventModel.findByIdAndUpdate(id,{$set:{
            title,
            description,   
            start_date, 
            end_date,
            creator,
            event_img : filename }},{ new: true })

        if (userId){
            const isParticipant = updatedEvent.participants.includes(userId);
            if (isParticipant) {
                throw new Error("user can't participate twice !");
            }
            userModel.findById(userId).then((user) => {
            updatedEvent.participants.push(user);
            updatedEvent.save().then((event) => {
                res.status(200).json(event);
            });
        });}else{
            res.status(200).json(updatedEvent);
        }
        
      
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteEvent = async(req,res,next) => {
    try {
        const { id } = req.params;
        const checkIfEventExists = await eventModel.findById(id);
        if (!checkIfEventExists){
            throw new Error("event not found !");
        }
        await checkIfEventExists.remove();
        res.status(200).json("event deleted succefully")
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getEvents = async(req,res,next) => {
    try {
        const events = await eventModel.find();
          
        if(!events||events.length===0){
            throw new Error("events not found !");
        }

        res.status(200).json({events}); 
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getEvent = async(req,res,next) => {
    try {
        const { id } = req.params;

        const event = await eventModel.findById(id);
          
        if(!event){
            throw new Error("event not found !");
        }
        
        res.status(200).json({event});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//http://localhost:5000/events/creator?id=6411868102a7bf3c154942d2&recent=true
const getEventsByCreator = async(req,res,next) => {
    try {
        const creatorId  = req.query.id;
        const recent = req.query.recent;
        
        if (recent) {
            const events = await eventModel
                 .find({ creator: creatorId })
                 .sort({ createdAt: -1 }) // Sort in descending order by createdAt
                 .limit(2);
                 return res.status(200).json({events});
          }
        console.log(creatorId);
        const events = await eventModel.find({ creator: creatorId });
        res.status(200).json({events});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getAllParticipantsEvent = async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const event = await eventModel.findById(eventId).populate("participants");
      const participants = event.participants;
      res.status(200).json(participants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


module.exports={
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getEvents,
    getEventsByCreator,
    getAllParticipantsEvent
}