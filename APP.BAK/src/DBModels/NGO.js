const mongoose = require('mongoose');

const NGOSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    fields: [{
      type: String,
    }],
    tasks: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Task'
    }]
  },
  {
    timestamps: true
  }
);

const NGO = mongoose.model('NGO', NGOSchema);

module.exports = NGO;
