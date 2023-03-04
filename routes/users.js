var express = require('express');
var router = express.Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/userControllers');


/* GET users listing. */
router.get('/',getUsers);
router.post('/',addUser);
router.put('/:id',updateUser);
router.delete('/:username',deleteUser);


module.exports = router;
