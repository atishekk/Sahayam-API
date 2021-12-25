//Resolvers
const resolvers = require("./Resolvers");

// Schema
const typeDefs = require("./Schema");

const { makeExecutableSchema } = require("apollo-server-express");

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
