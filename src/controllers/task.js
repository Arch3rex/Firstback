const mongoose = require('mongoose');
const Project = require('../models/projectModel');
const Task = require('../models/taskModel');

const get = (req, res) => {
  const idstore = req.params._pid;
  Project.findOne({ _id: idstore })
    .populate('tasks')
    .exec((err, proj) => {
      if (err) {
        console.log(err);
      } else {
        sortArr = proj.tasks;
        sortArr.sort((a, b) => {
          return a.prior - b.prior;
          console.log(sortArr);
        });
        console.log(sortArr);
        res.send(sortArr);
      }
    });
};

const post = (req, res) => {
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
      console.log(err);
    }
  });
  // add task ref to project`s tasks arr
  // eslint-disable-next-line max-len
  Project.updateOne(
    { _id: storeproject },
    { $push: { tasks: newTask._id } },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('200 OK');
      }
    }
  );
};

const patch = (req, res) => {
  Task.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
    if (err) {
      console.log(err);
    } else {
      res.send(obj);
    }
  });
};

const todelete = (req, res) => {
  const prid = req.params._pid;
  const storeId = req.body._tid;
  // del task ref from porj`s tasks arr
  Project.updateOne({ _id: prid }, { $pull: { tasks: storeId } }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  Task.deleteOne({ _id: storeId }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('200 OK');
    }
  });
};

module.exports = {
  get,
  post,
  patch,
  todelete,
};
