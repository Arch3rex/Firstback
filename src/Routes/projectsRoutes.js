const express = require('express');

const projControll = require('../Controllers/projectController');

const router = express.Router();

router
  .route('/projects/:uname')
  .get(projControll.getProj)

  .post(projControll.postProj)

  .patch(projControll.patchProj)

  .delete(projControll.deleteProj);

module.exports = router;
