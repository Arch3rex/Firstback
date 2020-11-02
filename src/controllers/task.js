const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

const get = (req, res, next) => {
  const idstore = req.params._pid;
  Project.findOne({ _id: idstore })
    .populate('tasks')
    .exec((err, proj) => {
      if (err) {
        next(err);
      } else {
        // sort tasks by priority
        sortArr = proj.tasks;
        sortArr.sort((a, b) => {
          return a.prior - b.prior;
        });
        res.status(200).json({ data: sortArr });
      }
    });
};

const post = (req, res, next) => {
  const storeproject = req.params._pid;
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content,
    prior: req.body.prior,
    deadline: req.body.deadline,
    isDone: req.body.isDone,
    project: storeproject,
  });

  newTask.save((err) => {
    if (err) {
      next(err);
    } else {
      // add task ref to project`s tasks arr
      Project.updateOne(
        { _id: storeproject },
        { $push: { tasks: newTask._id } },
        (err) => {
          if (err) {
            next(err);
          } else {
            res
              .status(200)
              .json({ data: 'succsessfully updated', _id: newTask._id });
          }
        }
      );
    }
  });
};

const patch = (req, res, next) => {
  Task.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ data: obj });
    }
  });
};

const todelete = (req, res, next) => {
  const prid = req.params._pid;
  const storeId = req.body._tid;
  // del task ref from porj`s tasks arr
  Project.updateOne({ _id: prid }, { $pull: { tasks: storeId } }, (err) => {
    if (err) {
      next(err);
    } else {
      Task.deleteOne({ _id: storeId }, (err) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ data: 'succsessfully deleted' });
        }
      });
    }
  });
};

module.exports = {
  get,
  post,
  patch,
  todelete,
};
