var express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
var router = express.Router();
const ChatController = require("../controllers/Chat/chatController");
const info = require("../controllers/Chat/informationsController");
const badWordController = require("../controllers/Chat/badWordsController");


//get chat
router.post("/PInfo", info.projectInfo);


router.get("/chats", ChatController.getChat);
//create a chat
router.post("/chat", ChatController.create);
//delete chat
router.get("/chat/delete/:id", ChatController.deleteChat);
// update chat
router.post('/chat/update/:id', ChatController.updateChat);
//get chat by giving 2 users
router.post('/chat/users', ChatController.chatByUsers);

//add users to chatroom
router.post('/chat/addUser/:id', ChatController.addUser);

//add messages to chat room
router.post('/chat/addMessage/',auth,ChatController.addMessage);


//load
router.post('/chat/load/', ChatController.load);

///

router.post('/chat/username/', ChatController.getUser);

router.post('/badwords',badWordController.newBadWord)

router.delete('/badwords/:word',badWordController.deleteBadWord);

module.exports = router;
