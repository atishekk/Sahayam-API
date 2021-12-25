const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  ngo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "NGO",
    required: true 
  }, // ID
  // take the defaults from the NGO
 // contact: { 
 //   type: String, 
 // },
 // email: { 
 //   type: String, 
 // },
  location: { 
    type: String, 
    required: true 
  },
  volRequired: Number,
  criteria: String,
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  tags: [{type: String}]
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
