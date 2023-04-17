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
            userId,
            reaction}=req.body;
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
        
        if (userId && reaction==="going"){
            const isParticipant = updatedEvent.participants.includes(userId);
            
            if (isParticipant) {
                const updatedEvent = await eventModel.findByIdAndUpdate(
                    id,
                    { $pull: { participants: userId } },
                    { new: true }
                  );
                
                    res.status(200).json(updatedEvent);
               
    
            }else{ 
                const updatedEvent = await eventModel.findByIdAndUpdate(
                    id,
                    { $push: { participants: userId } },
                    { new: true }
                    );
                    res.status(200).json(updatedEvent);
            }
           }else if (userId && reaction==="interested"){
            const isInterested = updatedEvent.interestedUsers.includes(userId);
            if (isInterested) {
                const updatedEvent = await eventModel.findByIdAndUpdate(
                    id,
                    { $pull: { interestedUsers: userId } },
                    { new: true }
                  );
                
                    res.status(200).json(updatedEvent);
            }else{
                const updatedEvent = await eventModel.findByIdAndUpdate(
                id,
                { $push: { interestedUsers: userId } },
                { new: true }
                );
                res.status(200).json(updatedEvent);
              }
            }else{
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
        const events = await eventModel.find().sort({ start_date: 1 });
    
        if (!events || events.length === 0) {
          throw new Error("Events not found!");
        }
    
        const now = new Date();
        let nearestEvent = events[0];
    
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event.start_date >= now) {
            nearestEvent = event;
            const nearestEventIndex = events.findIndex((ev) => ev === event);
            events.splice(nearestEventIndex, 1); // remove the nearest event
            break;
          }
        }
    
        res.status(200).json({ events, nearestEvent });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getEvent = async(req,res,next) => {
    try {
        const { id } = req.params;

        const event = await eventModel.findById(id);
        
        const creator = event.creator;

        const user = await userModel.findById(creator);
        
        const e = await eventModel.findById(id).populate("participants");

        const participants = e.participants;

        const i = await eventModel.findById(id).populate("interestedUsers");
        
        const interested = i.interestedUsers;
        
        if(!event){
            throw new Error("event not found !");
        }

        if(!user){
            throw new Error("user not found !");
        }
        
        res.status(200).json({event,user,participants,interested});
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
        const sortedEvents = events.sort((a, b) => {
            const aCount = a.interestedUsers.length + a.participants.length;
            const bCount = b.interestedUsers.length + b.participants.length;
            return bCount - aCount;
          });
       const bestevent=sortedEvents[0];
        res.status(200).json({events,bestevent});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getAllParticipantsEvent = async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const event = await eventModel.findById(eventId).populate("participants");
      const participants = event.participants;
      res.status(200).json({participants});
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