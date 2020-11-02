const server = require('../server');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');
const Project = require('../src/models/projectModel');
const connection = require('../src/lib/dbConnection');
const axios = require('axios');
const faker = require('faker');
const PORT = process.env.APP_PORT_TEST;

beforeAll(async () => {
    // before all test run server
    await new Promise(resolve => {
      _server = server.listen(PORT, resolve);
    });
  });

describe('create Project', () => {
  let _toDeleteProj;
  it('should create new project', async ()=>{
     const createUser = {
        _id: new mongoose.Types.ObjectId(),
        username: faker.internet.email(),
        password: faker.internet.password(),
    }
   const newUser = await User.create(createUser);
   expect(newUser).toBeDefined();

  const createProject ={
    name: faker.name.jobTitle(),
  }
  const resProj = await axios.post(`http://localhost:${PORT}/projects/${createUser.username}`, createProject);
  expect(resProj.status).toEqual(200);

  const checkProject = await Project.findOne({ _id: resProj.data._id });
  expect(checkProject).toBeDefined();
  _toDeleteProj = checkProject;

  expect(createProject.name).toEqual(checkProject.name);
});

  afterAll(async () => {
   if (_toDeleteProj) {
      const deleteProj = {
        _id: _toDeleteProj._id,
      }
      const deletingProj = await axios.delete(`http://localhost:${PORT}/projects/${_toDeleteProj.user}`, deleteProj);
      expect(deletingProj.status).toEqual(200);
    }
    await User.deleteOne({ _id: _toDeleteProj.user });
    connection.close();
   _server.close();
  });
});

