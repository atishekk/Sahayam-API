const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: String,
  publisher: {type: String, required: true},
  NGO: {type: String, required: true},
  contact: Number,
  email: String,
  location: {
    type: String,
    required: true,
  },
  volRequired: Number,
  volCurrent: Number,
  criteria: Array,
  volunteers: Array,
  tags: Array,
});

const Task = mongoose.model('Task', TaskSchema);

module.exports=Task;
