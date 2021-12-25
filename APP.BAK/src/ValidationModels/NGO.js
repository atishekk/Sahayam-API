const Joi = require('joi');

const RegisterNGO = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{2,40}$')).required(),
  location: Joi.string().pattern(new RegExp(/^[a-zA-Z\s]{2,40}\s*,\s*[a-zA-Z\s]{2,40}$/)).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')).required(),
  contact: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
  about: Joi.string().min(10).max(400).required(),
  fields: Joi.array().items(Joi.string())
})

const EditNGO = Joi.object({
  name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{2,40}$')),
  location: Joi.string().pattern(new RegExp(/^[a-zA-Z\s]{2,40}\s*,\s*[a-zA-Z\s]{2,40}$/)),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')),
  contact: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
  about: Joi.string().min(10).max(400),
  fields: Joi.array().items(Joi.string())
})

module.exports= {
  RegisterNGO,
  EditNGO
//  register: Joi.object({
//    name: Joi.string().required(),
//    ID: Joi.string().required(),
//    city: Joi.string(),
//    email: Joi.string().email().required(),
//    mobile: Joi.number(),
//    about: Joi.string().max(100),
//    description: Joi.string().min(100),
//    head: Joi.string(),
//    team: Joi.array(),
//  }),
};
