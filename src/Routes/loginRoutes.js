const express = require('express');

const userControll = require('../Controllers/userController');

const router = express.Router();

router.route('/register')
    .post(userControll.postReg);

router.route('/login')
    .post(userControll.postLog);

module.exports = router;
