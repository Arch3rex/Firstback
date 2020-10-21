const mongoose = require('mongoose');
const User = require('../models/userModel');


const postReg = (req, res) => {
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else {
      res.send('200 Ok');
    }
  });
};

const postLog = (req, res) => {
  const checkUname = req.body.username;
  const checkPwd = req.body.password;
  User.findOne({ username: checkUname }, (err, found) => {
    if (err) {
      console.error(err);
      res.send('error');
    } else if (found) {
      if (checkPwd === found.password) res.send('logged in');
    }
  });
};
module.exports = {
  postReg,
  postLog,
};
