var express = require('express');
var router = express.Router();
const { getFablabRequests, acceptFablabRequest, declineFablabRequest ,addFablabRequest, getFablabRequest,getFablabs,getFablab} = require('../controllers/fablabController');
const upload = require("../middlewares/upload");
const{fablabvalidate} = require('../middlewares/validate')

//fablabs functions 
router.get('/requests',getFablabRequests);
router.get('/requests/:id',getFablabRequest);
router.get('/',getFablabs);
router.get('/:id',getFablab);
router.post('/',upload.single("fablabLogo"),fablabvalidate,addFablabRequest);
router.post('/:id',acceptFablabRequest);
router.put('/:id',declineFablabRequest);

module.exports = router;
