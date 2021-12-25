const Joi = require('joi');

const volunteers = Joi.object({
});  

const Post = Joi.object({
  title: Joi.string().min(2).max(40),
  description: Joi.string().min(10).max(200),
  location: Joi.string().pattern(new RegExp(/^[a-zA-Z\s]{2,40}\s*,\s*[a-zA-Z\s]{2,40}$/)).required(),
  volRequired: Joi.number().integer(),
  criteria: Joi.string(),
  tags: Joi.array().items(Joi.string())
})

module.exports={
  Post
//  post: Joi.object({
//    name: Joi.string().required(),
//    ID: Joi.string().required(),
//    about: Joi.string().required().max(100),
//    description: Joi.string().min(100),
//    publisher: Joi.string().required(),
//    NGO: Joi.string().required(),
//    contact: Joi.number(),
//    email: Joi.string().email(),
//    location: Joi.string().required(),
//    volRequired: Joi.number(),
//    volCurrent: Joi.number(),
//    criteria: Joi.array(),
//    volunteers: Joi.array(),
//    tags: Joi.array(),
//  }),
};
