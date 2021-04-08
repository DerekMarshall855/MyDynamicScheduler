const express = require('express');

const UserCtrl = require('../controllers/user_ctrl');

const router = express.Router();

router.post('/user', UserCtrl.createUser);
router.post('/user/auth', UserCtrl.authUser);
router.get('/user/:username', UserCtrl.getUserByName);
router.delete('/user/:username', UserCtrl.deleteUser);

module.exports = router;