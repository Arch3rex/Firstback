const express = require('express');

const auth = require('../controllers/authentication');

const router = express.Router();

router.route('/register').post(auth.postReg);

router.route('/login').post(auth.postLog);

module.exports = router;
