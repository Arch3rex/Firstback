const express = require('express');
const proj = require('../controllers/project');
const jwtVerify =require('../lib/verifyToken');

const router = express.Router();

router
  .route('/projects/:uname')
  .get(jwtVerify, proj.get)

  .post(jwtVerify, proj.post)

  .patch(jwtVerify, proj.patch)

  .delete(jwtVerify, proj.todelete);

module.exports = router;
