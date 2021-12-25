const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  scalar Date

  type Query {
    me: User!
  }
  type Mutation {
    signUp(user: UserInput!): String!
    signIn(email: String!, password: String!): String!
    editUser(user: UserUpdate!): User!
    saveTask(taskId: ID!): Boolean
  }

# Input to be used when updating the user
  input UserUpdate {
    email: String
    password: String
    contact: String
    location: String
  }

# Input to create a user
  input UserInput {
    email: String!
    password: String!
    contact: String
    location: String
    name: String
  }

  type User {
    email: String!
    name: String
#    password: String!
    contact: String
    location: String
    #Recursive Query tasks
    tasks: [Task]!
  }
`;
