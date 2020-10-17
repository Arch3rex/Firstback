const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {type: String, required: true},
  prior: {type: Number, required: true},
  deadline: String,
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
});
const Task = new mongoose.model('Task', taskSchema);
module.exports = Task;

