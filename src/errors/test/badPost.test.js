const server = require('../../../server');
const connection = require('../../lib/dbConnection');
const axios = require('axios');
const faker = require('faker');

const PORT = 5004;

beforeAll(async () => {
    // before all test run server
    await new Promise(resolve => {
      _server = server.listen(PORT, resolve);
    });
  });

describe('error Handling for failed validation', () =>{
    it('should return an error', async ()=>{
        const postUser = {
           username: null,
           password: faker.internet.password(),
        }
       expect.assertions(2);
       try {
        await axios.post(`http://localhost:${PORT}/register`, postUser);
        } catch (e) {
          console.log(e);
          expect(e).toBeDefined();
          expect(e.response.status).toEqual(500);
        }
    });
    afterAll(async () => {
    connection.close();
   _server.close();
  });
});
