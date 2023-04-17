var express = require("express");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const auth= require("../middlewares/auth");
const mongoose = require('mongoose');
var router = express.Router();
const MessageController = require("../controllers/Chat/messageController");


router.post("/message", MessageController.create);
router.get("/message/:id", MessageController.getMessage);
router.get("/messages", MessageController.getMessages);
router.post('/message/update/:id', MessageController.updateMessage);
router.get("/message/delete/:id", MessageController.deleteMessage);
//get messages per user
router.get("/messages/user/:userId", MessageController.getMessagesByUser);


//get message by user in chatroom
router.get('/messages/user/:userId/chatroom/:chatRoomId', MessageController.getMessagesByUserInChatRoom);

//get message by chatroom

router.post('/message/chat/:idMessage', MessageController.messageToChat);

module.exports = router;