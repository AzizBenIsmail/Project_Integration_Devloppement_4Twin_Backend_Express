// Import Mongoose
const mongoose = require('mongoose');

// Define the BadWords schema
const BadWordsSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the BadWords model
const BadWords = mongoose.model('BadWords', BadWordsSchema);

module.exports = BadWords;
