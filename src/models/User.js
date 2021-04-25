import Joi from "Joi";
import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  password: String,
  ID: String,
  number: Number,
  area: String,
  email: String,
});
const UserJoiSchema = Joi.Object({
  name: Joi.string(),
  password: Joi.string(),
  ID: Joi.string(),
  number: Joi.number(),
  area: Joi.string(),
  email: Joi.string(),
});
export default {
  User,
  UserJoiSchema,
};
