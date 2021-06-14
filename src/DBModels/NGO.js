const mongoose = require('mongoose');

const NGOSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      ID: {
        type: String,
        required: true,
        unique: true,
      },
      city: {
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
      mobile: Number,
      about: String,
      description: String,
      //   todo change head later
      //   head: {type: Schema.Types.ObjectId, ref: 'User'},
      //   team: [{type: Schema.Types.ObjectId, ref: 'User'}],
      head: String,
      team: [String],
    },
    {
      timestamps: true,
    },
);

const NGO = mongoose.model('NGO', NGOSchema);

module.exports = NGO;
