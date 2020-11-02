const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Task = require('../models/taskModel');

const get = (req, res, next) => {
  const storeUser = req.params.uname;
  User.findOne({ username: storeUser })
    .populate('projects')
    .exec((err, user) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ data: user.projects });
      }
    });
};

const post = (req, res, next) => {
  const storeUser = req.params.uname;

  User.findOne({ username: storeUser }, (err, found) => {
    if (err) {
      next(err);
    } else if (found) {
      const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: found._id,
      });
      newProject.save((err) => {
        if (err) {
          return next(err);
        } else {
          User.updateOne(
            { username: storeUser },
            { $push: { projects: newProject._id } },
            (err) => {
              if (err) {
                next(err);
              } else {
                res
                  .status(200)
                  .json({ data: 'succsessfully updated', _id: newProject._id });
              }
            }
          );
        }
      });
    }
  });
};

const patch = (req, res, next) => {
  Project.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ data: obj });
    }
  });
};

const todelete = (req, res, next) => {
  const storeId = req.body._id;
  const storeUser = req.params.uname;
  // remove project reference from user`s projects array
  User.updateOne(
    { username: storeUser },
    { $pull: { projects: storeId } },
    (err) => {
      if (err) {
        next(err);
      } else {
        // delete project
        Project.deleteOne({ _id: storeId }, (err) => {
          if (err) {
            next(err);
          } else {
            // delete all tasks associated with project
            Task.deleteMany({ project: storeId }, (err) => {
              if (err) {
                next(err);
              } else {
                res.status(200).json({ data: 'succsessfully deleted' });
              }
            });
          }
        });
      }
    }
  );
};

module.exports = {
  get,
  post,
  patch,
  todelete,
};
