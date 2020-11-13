const mongoose = require('mongoose');
const connection = require('../lib/dbConnection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
});

userSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.setPassword = async function(plainPassword) {
  if (!plainPassword) {
    const err = new Error('User didnt sent password');
    err.status = 400;
    throw err;
  }

  this.password = await bcrypt.hash(plainPassword, saltRounds);
};

module.exports = connection.model('User', userSchema);
