const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // Necessary Information
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    //Extra information
    contact: {
      type: String,
    },
    name: String,
    location: String,
    tasks: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Task'
    }]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
