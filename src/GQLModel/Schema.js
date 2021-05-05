const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    hello: String
  }
  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirm_password: String!
    ): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
