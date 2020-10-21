const express = require('express');

const proj = require('../controllers/project');

const router = express.Router();

router
  .route('/projects/:uname')
  .get(proj.get)

  .post(proj.post)

  .patch(proj.patch)

  .delete(proj.todelete);

module.exports = router;
