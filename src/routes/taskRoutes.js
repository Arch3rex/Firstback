const express = require('express');

const task = require('../controllers/task');
const jwtVerify = require('../lib/verifyToken');

const router = express.Router();

router
  .route('/tasks/:_pid')
  .get(jwtVerify, task.get)
  .post(jwtVerify, task.post)
  .patch(jwtVerify, task.patch)
  .delete(jwtVerify, task.todelete);
module.exports = router;
