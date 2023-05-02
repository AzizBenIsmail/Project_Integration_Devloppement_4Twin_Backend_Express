const chatModel = require('../../models/chatRoomSchema');
const messageModel = require('../../models/MessageSchema');
const userModel = require('../../models/userSchema');
const BadWords = require('../../models/badwords');
//get all
exports.getChat = async (req, res, next) => {
    try {
        const chats = await chatModel.find().lean();
        if (!chats || chats.length === 0) {
            throw new Error("chats not found!");
        }
        res.status(200).json({ chats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//create

exports.create=(req,res,next)=>{

    // const {content} = req
 
     const chat = new chatModel({
        name:"chat1",
        members:["6430ad0b25ab08f90bc19042","6433df00458c3bd6a7550681"],
        messages:["643b25ea2e4bfe056097d9f4"]
     })
     chat.save()
   .then(savedChat => {
     console.log("Chat saved successfully:", savedChat);
     // Perform additional actions if needed
   })
   .catch(error => {
     console.error("Failed to save Chat:", error);
   });
     res.status(200).json({
        chat
     })
 }

 //delete chat

 exports.deleteChat = async (req, res, next) => {
    try {
      const { id } = req.params;
      // Find the message by ID and remove it from the database
      const deletedChat = await chatModel.findByIdAndRemove(id);
  
      if (!deletedChat) {
        // If the message is not found, send a response indicating it was not found
        return res.status(404).json({ message: 'Chat not found' });
      }
  
      // Send a response indicating the message was successfully deleted
      res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Chat' });
    }
  };

  // update chat

  exports.updateChat = async (req, res, next) => {
    try {
        const { name,members, messages} = req.body; // Assuming the updated content is sent in the request body
        const { id } = req.params; // Extract the id from request parameters

        // Update the content in the database
        const updatedChatResult = await chatModel.findByIdAndUpdate(id, { name, members, messages }, { new: true });

        if (!updatedChatResult) {
            throw new Error("Chat not found!");
        }

        res.status(200).json({ message: "Chat updated successfully", updatedMessage: updatedChatResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get chat by giving 2 users
exports.chatByUsers = async (req, res, next) => {
    try {
        const { members } = req.body;
        const user1 = members[0];
        const user2 = members[1];
        const foundDocuments = await chatModel.find({ members: { $elemMatch: { $eq: user1 } } });
        let user2Found = false; 

        for (const document of foundDocuments) {
            if (document.members.includes(user2)) {
                user2Found = true;
                break;
            }
        }

        if (user2Found) {
            res.status(200).json({ message: "Documents found successfully", documents: foundDocuments });
        } else {
            res.status(404).json({ message: "Documents not found" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/// uopdate members

exports.addUser = async (req, res, next) => {
    try {
        const { members} = req.body; // Assuming the updated content is sent in the request body
        const { id } = req.params; // Extract the id from request parameters

        // Update the content in the database
        const updatedChatResult = await chatModel.findByIdAndUpdate(id, {members}, { new: true });

        if (!updatedChatResult) {
            throw new Error("Chat not found!");
        }

        res.status(200).json({ message: "Chat updated successfully", updatedMessage: updatedChatResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//// bad word detector 

async function censorBadWords(str,badWords) {
  // List of bad words
  

  // Replace bad words with asterisks
  for (let i = 0; i < badWords.length; i++) {
    const regex = new RegExp(badWords[i], 'gi');
    str = str.replace(regex, '*'.repeat(badWords[i].length));
  }

  
  return str;
}





//add messages to chat room

exports.addMessage = async (req, res, next) => {
    try {
      
        let members = []
       members[0] = req.user._id
      members[1]=req.body.to; 

     
      const badWords = await getAllBadWords();



        const idMessage =createMessage(await censorBadWords(req.body.content,badWords),members[0])._id.toString()

        


        let chat = await chatByUser(members); // Await the result of chatByUser function
        console.log(chat)

        if (!chat||chat.length==0) {

             chat = new chatModel({
                name:"chat33",
                members:[members[0],members[1]],
                messages:[idMessage]
             })
          

             const n = await message2Chat(idMessage, chat._id); // Await the result of message2Chat function
             console.log(n)
             chat.save();
             res.status(200).json({ n });

        }else{
        const n = await message2Chat(idMessage, chat[0]._id); // Await the result of message2Chat function
        chat[0].messages.push(n)
        chat[0].save();
 

        res.status(200).json({ n });
    }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.addMes = async (member1, member2, content, next) => {
    try {

        let members = []
        members[0] = member1;///req.user._id
        members[1]=await userId(member2);
        const badWords = await getAllBadWords()
        

        const idMessage = createMessage(await censorBadWords(content, badWords), members[0])._id.toString();

        let chat = await chatByUser(members); 

        if (!chat|| chat.length === 0) {
            chat = new chatModel({
                name: "chat3hghgf3",
                members: [members[0], members[1]],
                messages: [idMessage]
            });

            const n = await message2Chat(idMessage, chat._id); 
            console.log(n);
            chat.save();
            return n;

        } else {
  
            const n = await message2Chat(idMessage, chat[0]._id); 
            chat[0].messages.push(n);
            chat[0].save();

            return n;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update message chat');
    }
};


const message2Chat = async (idMessage, chatRoom) => {
    try {
      const updatedChatResult = await messageModel.findByIdAndUpdate(
        idMessage, // Update this with the correct _id of the message document
        { chatRoom },
        { new: true }
      );
      return updatedChatResult;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update message chat');
    }
};

  


const chatByUser = async (members, next) => {
    try {
      const user1 = members[0];
      const user2 = members[1];
   
  
      const foundDocuments = await chatModel
        .find({
          $and: [
            { members: user2 },
            { members: user1 }
          ]
        })
        .populate("messages");
  
      return foundDocuments;
  
    } catch (error) {
      // Handle any errors that occur during the update process
      console.error(error);
      throw new Error('Failed to update message chat');
    }
  };



const createMessage=(content,sender,next)=>{

    // const {content} = req
 
     const message = new messageModel({
         content:content,
         sender:sender 
 
     })
     message.save()
   .then(savedMessage => {
      return savedMessage
     // Perform additional actions if needed
   })
   .catch(error => {
     console.error("Failed to save message:", error);
   });
   return(message)
 }



 ////// chat load


 exports.load = async (req, res, next) => {
    try {

        let members = []
        members[0] = req.body.user;///req.user._id


        const {to} = req.body.to;
        members[1]= await userId(req.body.to); 
  
       const chat = await chatByUser(members)
       console.log(chat)

        // Update the content in the database


        if (!chat) {
            throw new Error("Chat not found!");
        }

        res.status(200).json({ message: "Chat updated successfully", chat});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//// get user's id by his username

exports.getUser = async (req, res, next) => {
    try {
        const { username } = req.body;
        
        const user = await userModel.findOne({ username }).lean(); // Find a user by username

        if (!user) {
            throw new Error('User not found!');
        }
        const id=user._id 

        res.status(200).json({ id });
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
  

  async function getAllBadWords() {
    try {
      const badWords = await BadWords.find({});
      console.log(`Retrieved ${badWords.length} bad words from database`);
  
      const badWordList = badWords.map((badWord) => badWord.word);
      return badWordList;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving bad words');
    }
  }
  