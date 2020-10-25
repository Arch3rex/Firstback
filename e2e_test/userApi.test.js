const server = require('../server');
const User = require('../src/models/userModel');
const connection = require('../src/lib/dbConnection');
const axios = require('axios');
const faker = require('faker');

const PORT = process.env.APP_PORT_TEST;


describe('User Api', () => {
  let _server;
  let _userToDelete;

  beforeAll(async () => {
    // before all test run server
    await new Promise(resolve => {
      _server = server.listen(PORT, resolve);
    });
  });

  it('should create new user', async () => {
    const targetUser = {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };

    // register new user
    const response = await axios.post(`http://localhost:${PORT}/register`, targetUser);

    expect(response.status).toEqual(200);

    // check that the new user is contains in db
    const sourceUser = await User.findOne({ username: targetUser.username });
    expect(sourceUser).toBeDefined();
    _userToDelete = sourceUser;

    // check that new users field equal to users fields from request
    expect(targetUser.username).toEqual(sourceUser.username);
    expect(targetUser.password).toEqual(sourceUser.password);
  });


  afterAll(async () => {
    // delete user which we created in a test
    if (_userToDelete) {
      await User.deleteOne({ _id: _userToDelete._id });
    }
    connection.close();
    _server.close();
  });
});


