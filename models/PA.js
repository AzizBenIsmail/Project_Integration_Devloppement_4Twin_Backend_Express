const mongoose = require('mongoose');

const PASchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const PA = mongoose.model('PA', PASchema);

module.exports = PA;
