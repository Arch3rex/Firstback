const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Project = new mongoose.model('Project', projectSchema);
module.exports = Project;
