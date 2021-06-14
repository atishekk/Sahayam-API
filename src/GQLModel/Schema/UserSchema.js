const {gql} = require('apollo-server-express');
module.exports = gql`
  type Query {
    getUser(email: String, username: String): User
  }
  type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirm_password: String!
    ): String!
    signIn(username: String, email: String, password: String!): String!
    editUser(token:String,user:UserInput): User
  }
  input UserInput{
    username: String
    email: String
    name: String
    dateOfBirth: Int
    mobile: Int
    city: String
    country: String  
  }
  type User {
    username: String!
    email: String!
    name: String
    dateOfBirth: Int
    mobile: Int
    city: String
    country: String
    tasks:[String]
  }
`;
