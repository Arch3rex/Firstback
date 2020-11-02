const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const postReg = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
    if (err) {
        next(err);
    } else {
        const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: hash,
  });
    newUser.save( err => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ data: 'User created' });
    }
  });
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
      bcrypt.compare(checkPwd, found.password, (err, result)=>{
        if (err) {
          next(err);
        } else if (result === true) {
          const token = jwt.sign({ _id: found._id }, process.env.TOKEN_SECRET );
          res.header('Authorization', token).status(200).json({ data: 'logged in', token: token });
        }
        else if (result === false) {
          res.status(401).json({ data: 'wrong password' });
        }
      });
    }
  });
};
module.exports = {
  postReg,
  postLog,
};
