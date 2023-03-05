var express = require('express');
const validate = require("../middlewares/validate");
var router = express.Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/userControllers');


/* GET users listing. */
router.get('/',getUsers);
router.post('/',validate,addUser);
router.put('/:id',updateUser);
router.delete('/:username',deleteUser);


module.exports = router;
