const userResolver =require('./UserResolver');
const NGOResolver = require('./NGOResolver');
const TaskResolver = require('./TaskResolver');
const {GraphQLDateTime, GraphQLDate} = require('graphql-iso-date');

const {mergeResolvers} = require("@graphql-tools/merge");

const Date = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
}

const resolvers = [
  userResolver,
  NGOResolver,
  TaskResolver,
  Date,
];

module.exports = mergeResolvers(resolvers);
