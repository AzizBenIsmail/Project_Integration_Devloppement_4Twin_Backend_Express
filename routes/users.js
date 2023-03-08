var express = require('express');
const validate = require("../middlewares/validate");
const upload = require("../middlewares/upload");
var router = express.Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/userControllers');
const AuthController = require('../controllers/auth/auth-controller');



/* GET users listing. */
router.get('/',getUsers);
router.post('/',upload.single("image_user"),validate,addUser);
router.put('/:id',upload.single("image_user"),updateUser);
router.delete('/:id',deleteUser);
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);


// if page not found then status = 404 and message ... page not found
router.all('*', (req, res) => {
    res.status(404).send('Page not found!')
})


module.exports = router;
