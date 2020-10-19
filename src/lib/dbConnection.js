const mongoose = require('mongoose');
const config = require('../../config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connection = mongoose.createConnection(config.mongodb.uri);

connection.on('error', console.error);

module.exports = connection;
