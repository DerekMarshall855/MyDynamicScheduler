const express = require('express');

const TaskCtrl = require('../controllers/task_ctrl');

const router = express.Router();

router.post('/task', TaskCtrl.createTask);
router.delete('/task/:id', TaskCtrl.deleteTask);
router.get('/task', TaskCtrl.getTasks);

module.exports = router;