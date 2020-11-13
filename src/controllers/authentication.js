const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const postReg = (req, res, next) => {
  const { username, password } = req.body;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
  });

  newUser
    .setPassword(password)
    .then(() => {
      newUser.save((err) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({ data: newUser._id });
        }
      });
    })
    .catch(next);
};

const postLog = (req, res, next) => {
  const { username, password } = req.body;
  const accessDeniedError = new Error('Access denied!');
  accessDeniedError.status = 403;

  User.findOne({ username }, (err, found) => {
    if (err) {
      return next(err);
    }

    if (!found) {
      return next(accessDeniedError);
    }

    if (!found.checkPassword(password)) {
      return next(accessDeniedError);
    }

    const token = jwt.sign({ _id: found._id }, process.env.TOKEN_SECRET, { expiresIn: '12h' });
    res.status(200).json({ data: 'logged in', token: token });
  });
};
module.exports = {
  postReg,
  postLog,
};
