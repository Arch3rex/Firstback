const express = require('express');

const taskControll = require('../Controllers/taskController');

const router = express.Router();

router
  .route('/tasks/:_pid')
  .get(taskControll.getTask)
  .post(taskControll.postTask)
  .patch(taskControll.patchTask)
  .delete(taskControll.deleteTask);
module.exports = router;
