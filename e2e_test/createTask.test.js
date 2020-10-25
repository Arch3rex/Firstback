const server = require('../server');
const mongoose = require('mongoose');
const Task = require('../src/models/taskModel');
const Project = require('../src/models/projectModel');
const connection = require('../src/lib/dbConnection');
const axios = require('axios');
const faker = require('faker');

const PORT = 5001;

beforeAll(async () => {
    // before all test run server
    await new Promise(resolve => {
      _server = server.listen(PORT, resolve);
    });
  });

describe('create Task', () => {
  let _toDeleteTask;

  it('should create new task', async ()=>{
    const createProject = {
       _id: new mongoose.Types.ObjectId(),
       name: faker.hacker.verb(),
       user: new mongoose.Types.ObjectId(),
   }
  const newProject = await Project.create(createProject);
  expect(newProject).toBeDefined();

  const createTask = {
    content: faker.lorem.sentence(),
    prior: faker.random.number(),
    deadline: faker.date.future(),
    isDone: faker.random.boolean(),
  }

  const resTask = await axios.post(`http://localhost:${PORT}/tasks/${createProject._id}`, createTask);
  expect(resTask.status).toEqual(200);

  const checkTask = await Task.findOne({ _id: resTask.data._id });
  expect(checkTask).toBeDefined();
  
  _toDeleteTask = checkTask;

  expect(createTask.content).toEqual(checkTask.content);
  expect(createTask.prior).toEqual(checkTask.prior);
  expect(createTask.isDone).toEqual(checkTask.isDone);
});

  afterAll(async () => {
    if (_toDeleteTask) {
      const deleteTask = {
        _tid: _toDeleteTask._id,
      }
      const deletingTask = await axios.delete(`http://localhost:${PORT}/tasks/${_toDeleteTask.project}`, deleteTask);
      expect(deletingTask.status).toEqual(200);
    }
   await Project.deleteOne({ _id: _toDeleteTask.project });
    connection.close();
   _server.close();
  });
});

