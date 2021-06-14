const {gql} = require('apollo-server-express');

module.exports = gql`
  type Query {
    getNGOWorker(email: String, username: String): NGOWorker
  }
  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirm_password: String!
    ): String!
    signIn(username: String, email: String, password: String!): String!
    editNGOWorker(token: String, worker: NGOWorkerInput): NGOWorker
  }
  input NGOWorkerInput {
    username: String!
    email: String!
    name: String    
    dateOfBirth: Int
    mobile: Int
    city: String
    country: String
    NGO: String
  }
  type NGOWorker {
    username: String!
    email: String!
    name: String
    dateOfBirth: Int
    mobile: Int
    city: String
    country: String
    NGO: String
  }
`;

// todo list of posts
