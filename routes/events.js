var express = require('express');
const { getEvents, getEvent, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
var router = express.Router();
const upload = require("../middlewares/upload");

router.get('/',getEvents);
router.get('/:id',getEvent);
router.post('/',upload.single("event_img"),addEvent);
router.put('/:id',upload.single("event_img"),updateEvent);
router.delete('/:id',deleteEvent);



module.exports = router;



