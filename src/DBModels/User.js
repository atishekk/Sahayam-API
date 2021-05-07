const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
    // absolute necessary
      username: {
        type: String,
        required: true,
        index: {unique: true},
      },
      password: {
        type: String,
        required: true,
      },
      email: {type: String, required: true, index: {unique: true}},
      // Additional info that the user can give for better experience
      name: String,
      dateOfBirth: Date,
      mobile: Number,
      city: String,
      country: String,
    },
    {
      timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
