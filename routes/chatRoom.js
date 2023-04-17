var express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
var router = express.Router();
const ChatController = require("../controllers/Chat/chatController");

//get chat

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
router.post('/chat/addMessage/', ChatController.addMessage);


//load
router.post('/chat/load/', ChatController.load);

///

router.post('/chat/username/', ChatController.getUser);

module.exports = router;
