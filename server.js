require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const { User, Project, Task } = require('./Schemas');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterfree.neutu.mongodb.net/ProjectDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,
}).then(() => console.log('Database Connected')).catch((err) => console.log(err));

app.route('/register')
  .post((req, res) => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send('200 Ok');
      }
    });
  });

app.route('/login')
  .post((req, res) => {
    const checkUname = req.body.username;
    const checkPwd = req.body.password;
    User.findOne({ username: checkUname }, (err, found) => {
      if (err) {
        console.log(err);
      } else if (found) {
        if (checkPwd === found.password) res.send('logged in');
      }
    });
  });

/// /////////////////////////////////////////////////Projects/////////////////////////////////////
app.route('/projects/:uname')
  .get((req, res) => {
    const storeUser = req.params.uname;
    User.findOne({ username: storeUser }).populate('projects').exec((err, user) => {
      if (err) { console.log(err); } else { res.send(user.projects); }
    });
  })

  .post((req, res) => {
    const storeUser = req.params.uname;

    User.findOne({ username: storeUser }, (err, found) => {
      if (err) { console.log(err); } else if (found) {
        const newProject = new Project({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          user: found._id,
        });
        newProject.save((err) => {
          if (err) { console.log(err); }
        });
        // add projet reference to user`s projects array
        User.updateOne({ username: storeUser }, { $push: { projects: newProject._id } }, (err) => {
          if (err) { console.log(err); } else { res.send('200 OK'); }
        });
      }
    });
  })

  .patch((req, res) => {
    Project.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
      if (err) { res.send(err); } else { res.send(obj); }
    });
  })

  .delete((req, res) => {
    const storeId = req.body._id;
    const storeUser = req.params.uname;
    // remove project reference from user`s projects array
    User.updateOne({ username: storeUser }, { $pull: { projects: storeId } }, (err) => {
      if (err) { console.log(err); }
    });
    // delete project
    Project.deleteOne({ _id: storeId }, (err) => {
      if (err) { res.send(err); } else { res.send('200 Ok'); }
      // delete all tasks associated with project
      Task.deleteMany({ project: storeId }, (err) => {
        if (err) { console.log(err); }
      });
    });
  });
/// /////////////////////////////////////////////TASKS///////////////////////////////////////////

app.route('/tasks/:_pid')
  .get((req, res) => {
    const idstore = req.params._pid;
    Project.findOne({ _id: idstore }).populate('tasks').exec((err, proj) => {
      if (err) { console.log(err); } else { res.send(proj.tasks); }
    });
  })

  .post((req, res) => {
    const storeproject = req.params._pid;

    const newTask = new Task({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      prior: req.body.prior,
      deadline: req.body.deadline,
      isdone: req.body.isdone,
      project: storeproject,
    });

    newTask.save((err) => {
      if (err) { console.log(err); }
    });
    // add task ref to project`s tasks arr
    Project.updateOne({ _id: storeproject }, { $push: { tasks: newTask._id } }, (err) => {
      if (err) { console.log(err); } else { res.send('200 OK'); }
    });
  })
  .patch((req, res) => {
    Task.updateOne({ _id: req.body._id }, { $set: req.body }, (err, obj) => {
      if (err) { console.log(err); } else { res.send(obj); }
    });
  })
  .delete((req, res) => {
    const prid = req.params._pid;
    const storeId = req.body._tid;
    // del task ref from porj`s tasks arr
    Project.updateOne({ _id: prid }, { $pull: { tasks: storeId } }, (err) => {
      if (err) { console.log(err); }
    });

    Task.deleteOne({ _id: storeId }, (err) => {
      if (err) { res.send(err); } else { res.send('200 OK'); }
    });
  });

app.listen(4000);
