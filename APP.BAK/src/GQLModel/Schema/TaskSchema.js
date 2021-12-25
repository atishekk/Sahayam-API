const { gql } = require('apollo-server-express');

//TODO: editTask

module.exports = gql`
  type Query {
    feed(tags: [String]): [Task]!
    searchTask(name: String): [Task]!
    getTask(id: ID!): Task!
  }
  type Mutation {
    #done by a user
    volunteer(id: ID!): Boolean
    # done by an NGO
    post(task: InputTask!): Task!
    editTask(task: UpdateTask!): Task!
  }

# use when updating the task
  input UpdateTask {
    title: String!
    description: String!
    location: String!
    volRequired: Int
    criteria: String
    tags: [String]
  }

# use when creating a task
  input InputTask {
    title: String!
    description: String!
    location: String!
    volRequired: Int
    criteria: String
    tags: [String]
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    ngo: NGO!
    location: String!
    volRequired: Int
    criteria: String
    volunteers: [User]!
    tags: [String]
  }
`;
