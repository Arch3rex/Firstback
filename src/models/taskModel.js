const mongoose = require('mongoose');
const connection = require('../lib/dbConnection');

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true },
  prior: { type: Number, required: true },
  deadline: String,
  isDone: Boolean,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = connection.model('Task', taskSchema);
