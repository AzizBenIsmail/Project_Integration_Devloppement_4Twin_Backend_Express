const messageModel = require('../../models/MessageSchema');

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await messageModel.find().lean();
        if (!messages || messages.length === 0) {
            throw new Error("Messages not found!");
        }
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getMessagesByUser=async (req, res,next) => {
    const userId = req.params.userId;

    try {
      // Find all messages where sender field matches the userId
      const messages = await messageModel.find({ sender: userId }); // Using Mongoose populate to get the sender information

      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  }


  exports.getMessagesByUserInChatRoom= async (req, res) => {
    const userId = req.params.userId;
    const chatRoomId = req.params.chatRoomId;

    try {
      // Find all messages where sender field matches the userId and chatRoom field matches the chatRoomId
      const messages = await messageModel.find({ sender: userId, chatRoom: chatRoomId }).populate('sender');

      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
  }


exports.getMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const messages = await messageModel.findById(id)
        if (!messages || messages.length === 0) {
            throw new Error("Messages not found!");
        }
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.create=(req,res,next)=>{

   // const {content} = req

    const message = new messageModel({
        content:req.body.content,
        sender:"6430ad0b25ab08f90bc19042" //will be changed to req.user._id

    })
    message.save()
  .then(savedMessage => {
    console.log("Message saved successfully:", savedMessage);
    // Perform additional actions if needed
  })
  .catch(error => {
    console.error("Failed to save message:", error);
  });
    res.status(200).json({
        message
    })
}

exports.updateMessage = async (req, res, next) => {
    try {
        const { content } = req.body; // Assuming the updated content is sent in the request body
        const { id } = req.params; // Extract the id from request parameters

        // Update the content in the database
        const updatedMessageResult = await messageModel.findByIdAndUpdate(id, { content }, { new: true });

        if (!updatedMessageResult) {
            throw new Error("Message not found!");
        }

        res.status(200).json({ message: "Message updated successfully", updatedMessage: updatedMessageResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteMessage = async (req, res, next) => {
    try {
      const { id } = req.params;
      // Find the message by ID and remove it from the database
      const deletedMessage = await messageModel.findByIdAndRemove(id);
  
      if (!deletedMessage) {
        // If the message is not found, send a response indicating it was not found
        return res.status(404).json({ message: 'Message not found' });
      }
  
      // Send a response indicating the message was successfully deleted
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  };


  /// give a message a chatroom

  exports.messageToChat = async (req, res, next) => {
    try {
      const { chatRoom ,idMessage} = req.body; 
      // Find the message by ID and remove it from the database
      const updatedChatResult = await messageModel.findByIdAndUpdate(idMessage, {chatRoom}, { new: true });

      res.status(200).json({ updatedChatResult});
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
      res.status(500).json({ error: 'Failed to Message chat' });
    }
  };
