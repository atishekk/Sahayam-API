const userSchema = require('./UserSchema');
const NGOSchema = require('./NGOSchema');
const TaskSchema = require('./TaskSchema');

const { mergeTypeDefs } = require('@graphql-tools/merge');

const schema = [
  userSchema,
  NGOSchema,
  TaskSchema
];

module.exports = mergeTypeDefs(schema);
