const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

messageSchema.statics.findByUser = function(userId) {
  return this.find({ sender: userId })
    .populate('sender') // Populate the 'sender' field with User data
    .populate('chatRoom') // Populate the 'chatRoom' field with ChatRoom data
    .exec();
};


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
