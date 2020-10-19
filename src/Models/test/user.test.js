const connection = require('../../lib/dbConnection');
const User = require('../Usermodel');

describe('User model', () => {
  afterAll(() => {
    connection.close();
  });

  it('check User model fields', () => {
    const fields = User.schema.obj;
    expect(fields.username).toBeDefined();
    expect(fields.password).toBeDefined();
    expect(fields.projects).toBeDefined();
  });
});
