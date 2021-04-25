import Joi from "Joi";
import mongoose from "mongoose";

const NGO = new mongoose.Schema({
  name: String,
  ID: String,
  number: Number,
  email: String,
  address: String,
  about: String,
  description: String,
  head: String,
  team: Array,
});
const NGOJoiSchema = Joi.Object({
  name: Joi.string(),
  ID: Joi.string(),
  number: Joi.number(),
  email: Joi.string(),
  address: Joi.string(),
  about: Joi.string(),
  description: Joi.string(),
  head: Joi.string(),
  team: Joi.array().items(Joi.string()),
});
export default {
  NGO,
  NGOJoiSchema,
};
