const mongoose = require('mongoose');

const NGOWorkerSchema = new mongoose.Schema(
    {
    // absolute necessary
      username: {
        type: String,
        required: true,
        index: {
          unique: true,
        },
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        index: {
          unique: true,
        },
      },
      // Additional info that the user can give for better experience
      name: String,
      dateOfBirth: Number,
      mobile: Number,
      city: String,
      country: String,
      NGO: String,
    //   todo posted
    //   taskPosted:[]
    },
    {
      timestamps: true,
    },
);

const NGOWorker = mongoose.model('NGOWorker', NGOWorkerSchema);

module.exports = NGOWorker;

