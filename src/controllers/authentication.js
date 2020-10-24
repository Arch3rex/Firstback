const mongoose = require('mongoose');
const User = require('../models/userModel');


const postReg = (req, res, next) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save(err => {
    if (err) {
    next(err);
    } else {
      res.status(200).json({ 'data': 'User created' });
    }
  });
};

const postLog = (req, res, next) => {
  const checkUname = req.body.username;
  const checkPwd = req.body.password;
  User.findOne({ username: checkUname }, (err, found) => {
    if (err) {
    next(err);
    } else if (found) {
      if (checkPwd === found.password) {
        res.status(200).json({ 'data': 'logged in' });
      }
    }
  });
};
module.exports = {
  postReg,
  postLog,
};
