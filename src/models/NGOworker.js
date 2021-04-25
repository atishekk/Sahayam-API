import Joi from "Joi";
import mongoose from "mongoose";

const NGOworker = new mongoose.Schema({
  name: String,
  password: String,
  ID: String,
  number: Number,
  email: String,
  area: String,
  NGO: String,
});
const NGOworkerJoiSchema = Joi.Object({
  name: Joi.string(),
  password: Joi.string(),
  ID: Joi.string(),
  number: Joi.number(),
  area: Joi.string(),
  email: Joi.string(),
  NGO: Joi.string(),
});
export default {
  NGOworker,
  NGOworkerJoiSchema,
};
