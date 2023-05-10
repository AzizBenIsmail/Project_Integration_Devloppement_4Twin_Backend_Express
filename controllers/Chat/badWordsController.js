const BadWords = require('../../models/badwords');



  exports.newBadWord = async (req, res, next) => {

    const newBadWord = new BadWords({
        word: req.body.word,
      });
    
      newBadWord.save()
        .then(() => {
          console.log('New bad word added to database');
          res.status(201).send('Bad word added');
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error adding bad word');
        });
  }





  exports.deleteBadWord = async (req, res, next) => {
    const badWord = req.params.word;

    BadWords.findOneAndDelete({ word: badWord })
      .then((result) => {
        if (result) {
          console.log(`Bad word '${badWord}' deleted from database`);
          res.status(204).send();
        } else {
          console.log(`Bad word '${badWord}' not found in database`);
          res.status(404).send('Bad word not found');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error deleting bad word');
      });
  }




  exports.getAllBadWords = async (req, res, next) => {
    BadWords.find({})
    .then((badWords) => {
      console.log(`Retrieved ${badWords.length} bad words from database`);
      res.status(200).json(badWords);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving bad words');
    });
  }



  