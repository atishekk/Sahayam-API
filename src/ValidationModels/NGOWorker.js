const Joi = require('joi');

const SignUp = Joi.object({
  username: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirm_password: Joi.ref('password'),
});

const SignIn = Joi.object({
  username: Joi.string().alphanum().min(2).max(40),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).or('username', 'email');

module.exports = {
  SignUp,
  SignIn,
};
