// TODO: rename file in camelCase
const mongoose = require('mongoose');
const connection = require('../lib/dbConnection');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // TODO: camelCase please
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = connection.model('User', userSchema);
