const server = require('../../../server');
const axios = require('axios');
const faker = require('faker');

const PORT = 5005;


beforeAll(async () => {
    // before all test run server
    await new Promise(resolve => {
      _server = server.listen(PORT, resolve);
    });
  });

describe('error handler work', ()=> {
    it('should trigger notExsist middleware', async ()=>{
        const wrongRoute = faker.random.word();
        expect.assertions(2);
        try {
        await axios.get(`http://localhost:${PORT}/${wrongRoute}`);
        } catch (e) {
        console.log(e);
        expect(e).toBeDefined();
        expect(e.response.status).toEqual(404);
    }
});
    afterAll(async () => {
   _server.close();
  });
});
