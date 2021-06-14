const Joi = require('joi');

module.exports={
  post: Joi.object({
    name: Joi.string().required(),
    ID: Joi.string().required(),
    about: Joi.string().required().max(100),
    description: Joi.string().min(100),
    publisher: Joi.string().required(),
    NGO: Joi.string().required(),
    contact: Joi.number(),
    email: Joi.string().email(),
    location: Joi.string().required(),
    volRequired: Joi.number(),
    volCurrent: Joi.number(),
    criteria: Joi.array(),
    volunteers: Joi.array(),
    tags: Joi.array(),
  }),
};
