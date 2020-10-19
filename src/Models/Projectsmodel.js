// TODO: rename file in camelCase

const mongoose = require('mongoose');
const connection = require('../lib/dbConnection');

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = connection.model('Project', projectSchema);
