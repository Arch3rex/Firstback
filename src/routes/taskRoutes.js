const express = require('express');

const task = require('../controllers/task');

const router = express.Router();

router
  .route('/tasks/:_pid')
  .get(task.get)
  .post(task.post)
  .patch(task.patch)
  .delete(task.todelete);
module.exports = router;
