var express = require('express');
const validate = require("../middlewares/validate");
const Register = require("../middlewares/Register");
const upload = require("../middlewares/upload");
var router = express.Router();
const { getUsers,getUser, addUser, deleteUser, updateUser } = require('../controllers/userControllers');
const { getFablabs, acceptFablabRequest, declineFablabRequest ,addFablabRequest} = require('../controllers/fablabController');

const AuthController = require('../controllers/auth/auth-controller');
const passport = require('passport');
const passportLocalMongoose= require('passport-local-mongoose');


/* GET users listing. */
router.get('/',getUsers);
router.get('/:id',getUser);
router.post('/',upload.single("image_user"),Register,addUser);
router.put('/:id',upload.single("image_user"),updateUser);
router.delete('/:id',deleteUser);
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);
router.post('/logout',AuthController.logout);

//fablabs functions 
router.get('/fablab',getFablabs);
router.post('/fablab',addFablabRequest);
router.post('/fablab/:id',acceptFablabRequest);
router.delete('/fablab/:id',declineFablabRequest);




//test section ( will  be deleted later )
router.get('/test',(req,res)=>{

    if(req.isAuthenticated()){
    console.log("testttttttttttttttt valided :)");
    res.send("done")
    }
else
    console.log("not workinnnnggggg  :(");
    res.send("not done !!")


});


// if page not found then status = 404 and message ... page not found
router.all('*', (req, res) => {
    res.status(404).send('Page not found!')
})


module.exports = router;
