const server = require('./server');

const PORT = process.env.APP_PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
