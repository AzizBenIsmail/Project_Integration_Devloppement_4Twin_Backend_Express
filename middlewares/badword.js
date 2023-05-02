const BadWords = require('../models/badwords');


async function censorBadWords(str) {
    // List of bad words
    
    const badWords = await getAllBadWords();
    // Replace bad words with asterisks
    for (let i = 0; i < await badWords.length; i++) {
      const regex = new RegExp(badWords[i], 'gi');
      str = str.replace(regex, '*'.repeat(badWords[i].length));
    }
  
    
    return str;
  }

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
  
  module.exports = {
    censorBadWords,
    getAllBadWords
  };