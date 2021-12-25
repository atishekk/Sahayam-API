const Joi = require('joi');

const SignUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')).required(),
  //confirm_password: Joi.ref('password'), Check on the frontend
  name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{2,40}$')),
  contact: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
  location: Joi.string().pattern(new RegExp(/^[a-zA-Z\s]{2,40}\s*,\s*[a-zA-Z\s]{2,40}$/)),
});

const SignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')).required(),
});

const EditUser = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,40}$')),
  //confirm_password: Joi.ref('password'), Check on the frontend
  name: Joi.string().pattern(new RegExp('^[a-zA-Z ]{2,40}$')),
  contact: Joi.string().pattern(new RegExp('^[0-9]{10}$')),
  location: Joi.string().pattern(new RegExp(/^[a-zA-Z\s]{2,40}\s*,\s*[a-zA-Z\s]{2,40}$/)),
})

module.exports = {
  SignUp,
  SignIn,
  EditUser,
};
