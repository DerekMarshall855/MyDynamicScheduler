const express = require('express');

const EventCtrl = require('../controllers/event_ctrl');

const router = express.Router();

router.post('/event', EventCtrl.createEvent);
router.delete('/event/:id', EventCtrl.deleteEvent);
router.get('/event', EventCtrl.getEvents);

module.exports = router;