const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    getTasksByTags(tags: [String]): [Task]
    getTask(id: String!): Task
    getTasks: [Task]
  }
  type Mutation {
    volunteer(id: String, username: String): Task
    post(task: inputTask): Task
  }
  input inputTask {
    name: String!
    ID: String!
    about: String!
    description: String
    publisher: String!
    NGO: String!
    contact: Int
    email: String!
    location: String!
    volRequired: Int
    volCurrent: Int
    criteria: [String]
    volunteers: [String]
    tags: [String]
  }
  type Task {
    name: String!
    ID: String!
    about: String!
    description: String
    publisher: String!
    NGO: String!
    contact: Int
    email: String!
    location: String!
    volRequired: Int
    volCurrent: Int
    criteria: [String]
    volunteers: [String]
    tags: [String]
  }
`;
