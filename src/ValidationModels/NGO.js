const Joi = require('joi');
module.exports= {
  register: Joi.object({
    name: Joi.string().required(),
    ID: Joi.string().required(),
    city: Joi.string(),
    email: Joi.string().email().required(),
    mobile: Joi.number(),
    about: Joi.string().max(100),
    description: Joi.string().min(100),
    head: Joi.string(),
    team: Joi.array(),
  }),
};
