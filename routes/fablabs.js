var express = require('express');
var router = express.Router();
const { getFablabRequests, acceptFablabRequest, declineFablabRequest ,addFablabRequest, getFablabRequest,getFablabs,getFablab, checkFablabNameUnique, checkFablabEmailUnique} = require('../controllers/fablabController');
const upload = require("../middlewares/upload");
const{fablabvalidate} = require('../middlewares/validate')

//fablabs functions 
router.get('/requests',getFablabRequests);
router.get('/requests/:id',getFablabRequest);
router.get('/',getFablabs);
router.get('/:id',getFablab);
router.post('/',upload.single("fablabLogo"),addFablabRequest);
router.post('/:id',acceptFablabRequest);
router.put('/:id',declineFablabRequest);

router.get("/checkName/:name",checkFablabNameUnique);
router.get("/checkEmail/:email",checkFablabEmailUnique);

module.exports = router;
