const chatModel = require('../../models/chatRoomSchema');
const messageModel = require('../../models/MessageSchema');
const userModel = require('../../models/userSchema');
const BadWords = require('../../models/badwords');
const perspective = require("perspective-api-client");
const { reduceXP2 } = require('../evaluationController');
const nodemailer = require("nodemailer");
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


function hasBadWord(str, badWords) {
  for (let i = 0; i < badWords.length; i++) {
    const regex = new RegExp(badWords[i], 'gi');
    if (str.match(regex)) {
      return true;
    }
  }
  return false;
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

        if (!chat||chat.length==0) {

             chat = new chatModel({
                name:"chat33",
                members:[members[0],members[1]],
                messages:[idMessage]
             })
          

             const n = await message2Chat(idMessage, chat._id); // Await the result of message2Chat function
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

function sendAccountDisabledEmail(user) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"GreenFound" <greencrowd2223@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Account Disabled", // Subject line
    html: `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Disabled</title>
          <style>
            /* Global Styles */
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
            }
            /* Header Styles */
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            /* Content Styles */
            .content {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
            }
            .content h1 {
              margin-top: 0;
            }
            .content p {
              margin-bottom: 20px;
            }
            .content img {
              display: block;
              margin: 0 auto 20px;
              max-width: 100%;
            }
            /* Footer Styles */
            .footer {
              background-color: #007bff;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Account Disabled</h1>
          </div>
          <div class="content">
            <img src="https://vertexmarketingagency.com/wp-content/uploads/2021/09/facebook-ad-account-disabled.jpg" alt="Account Disabled" width="400" height="250">
            <h1>Your account has been disabled due to inappropriate behavior.</h1>
            <p>Please contact our support team if you have any questions or concerns.</p>
          </div>
          <div class="footer">
            <p>© 2023 GreenFound.com. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Account disabled email sent to ${user.email}: ${info.messageId}`);
  });
}


exports.addMes = async (member1, member2, content, next) => {
    try {

        let members = []
        members[0] = member1;///req.user._id
        members[1]=await userId(member2);
        const badWords = await getAllBadWords()
        
        const client = new perspective({
          apiKey: 'AIzaSyD8EsP6LrDD5wsHHLPaN6SP_22cvKXTNE0',
        });
        const idMessage = createMessage(await censorBadWords(content, badWords), members[0])._id.toString();

        const user = await userModel.findOne({ _id: members[0] });
        
        if (hasBadWord(content,badWords)) {
          if (user.inappropriateBehaviorCount) {
            reduceXP2(user.username,10);
            user.inappropriateBehaviorCount += 1;

            if(user.inappropriateBehaviorCount >4){
  sendAccountDisabledEmail(user);

                            }

          } else {
            user.inappropriateBehaviorCount = 1;
          }
          await user.save(); 
        }



        
        const text = content;
        
        client.analyze({
          comment: { text },
          languages: ['en'],
          requestedAttributes: {
            TOXICITY: {},
          },
        })
        .then(async (response) => {
          const toxicityScore = response.attributeScores.TOXICITY.summaryScore.value;
          if (toxicityScore > 0.3) {
            if (user.inappropriateBehaviorCount) {
              user.inappropriateBehaviorCount += 1;
              if(user.inappropriateBehaviorCount >4){sendAccountDisabledEmail(user);
              }
            } else {
              user.inappropriateBehaviorCount = 1;
            }
            await user.save(); 
            console.log('Harassment detected!');
          } else {
            console.log('No harassment detected.');
          }
        })
        .catch((error) => {
          console.error(error);
        });




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



exports.changeColor = async (req, res, next) => {
  try {
    const  id  = req.body.userId;
    // Find the user by ID
    const user = await userModel.findById(id);

    // Update the user's favColor value
    if(req.body.newColor){
    user.favColor = req.body.newColor;

    // Save the updated user document to the database
    await user.save();
  }
    // Return the updated user object
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
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
  