var express = require('express');
var router = express.Router();
const { getFablabs, acceptFablabRequest, declineFablabRequest ,addFablabRequest, getFablab} = require('../controllers/fablabController');


//fablabs functions 
router.get('/',getFablabs);
router.get('/:id',getFablab);
router.post('/',addFablabRequest);
router.post('/:id',acceptFablabRequest);
router.put('/:id',declineFablabRequest);

module.exports = router;
