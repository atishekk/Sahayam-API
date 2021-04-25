import Joi from "Joi";
import mongoose from "mongoose";

const Task = new mongoose.Schema({
  name: String,
  ID: String,
  about: String,
  description: String,
  publisher: String,
  NGO: String,
  number: Number,
  email: String,
  location: String,
  volRequired: Number,
  volCurrent: Number,
  criteria: Array,
  volunteers: Array,
});
const TaskJoiSchema = Joi.Object({
  name: Joi.string(),
  ID: Joi.string(),
  about: Joi.string(),
  description: Joi.string(),
  publisher: Joi.string(),
  NGO: Joi.string(),
  number: Joi.number(),
  email: Joi.string(),
  location: Joi.string(),
  volRequired: Joi.number(),
  volCurrent: Joi.number(),
  criteria: Joi.array(),
  volunteers: Joi.array(),
});
export default {
  Task,
  TaskJoiSchema,
};
