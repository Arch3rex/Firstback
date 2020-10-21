const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');

const get = (req, res) => {
  const storeUser = req.params.uname;
  User.findOne({ username: storeUser })
    .populate('projects')
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.send(user.projects);
      }
    });
};

const post = (req, res) => {
  const storeUser = req.params.uname;

  User.findOne({ username: storeUser }, (err, found) => {
    if (err) {
      console.log(err);
    } else if (found) {
      const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: found._id,
      });
      newProject.save((err) => {
        if (err) {
          console.log(err);
        }
      });
      // add projet reference to user`s projects array
      // eslint-disable-next-line max-len
      User.updateOne(
        { username: storeUser },
        { $push: { projects: newProject._id } },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send('200 OK');
          }
        }
      );
    }
  });
};

const patch = (req, res) => {
  Project.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
    if (err) {
      res.send(err);
    } else {
      res.send(obj);
    }
  });
};

const todelete = (req, res) => {
  const storeId = req.body._id;
  const storeUser = req.params.uname;
  // remove project reference from user`s projects array
  User.updateOne(
    { username: storeUser },
    { $pull: { projects: storeId } },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  // delete project
  Project.deleteOne({ _id: storeId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('200 Ok');
    }
    // delete all tasks associated with project
    Task.deleteMany({ project: storeId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};

module.exports = {
  get,
  post,
  patch,
  todelete,
};
