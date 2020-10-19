// eslint-disable-next-line max-len
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterfree.neutu.mongodb.net/ProjectDB?retryWrites=true&w=majority`;

module.exports = {
  mongodb: {
    // TODO: need to add separate independent test environment
    uri: process.env.NODE_ENV === 'test' ? mongoUri : mongoUri,
  },
};
