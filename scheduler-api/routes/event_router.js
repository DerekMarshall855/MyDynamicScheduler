const express = require('express');

/*
    Defines routes for each function of event controller
*/

const EventCtrl = require('../controllers/event_ctrl');

const router = express.Router();

router.post('/event', EventCtrl.createEvent);
router.delete('/event/:id', EventCtrl.deleteEvent);
router.get('/event/:username', EventCtrl.getEvents);

module.exports = router;