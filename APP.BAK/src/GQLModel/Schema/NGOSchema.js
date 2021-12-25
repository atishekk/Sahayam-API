const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    searchNGO(Name: String!): [NGO]!
    getNGOs: [NGO]!
    NGOme: NGO!
  }

  type Mutation {
    registerNGO(ngo: InputNGO): String!
    editNGO(ngo: UpdateNGO!): NGO!
  }

  input UpdateNGO {
    name: String
    location: String
    email: String
    password: String
    contact: String
    about: String
    fields: [String]
  }

# use when registering a new NGO
  input InputNGO {
    name: String!
    location: String!
    email: String!
    password: String!
    contact: String!
    about: String!
    fields: [String]
  }

  type NGO {
    name: String!
    email: String!
    location: String!
    contact: String!
    about: String!
    fields: [String]!
    tasks: [Task]!
  }
`;
