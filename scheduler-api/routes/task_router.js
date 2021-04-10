const express = require('express');

/*
    Defines routes for each function of task controller
*/

const TaskCtrl = require('../controllers/task_ctrl');

const router = express.Router();

router.post('/task', TaskCtrl.createTask);
router.delete('/task/:id', TaskCtrl.deleteTask);
router.get('/task/:username', TaskCtrl.getTasks);

module.exports = router;