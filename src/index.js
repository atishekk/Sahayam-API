// Dependencies
require('dotenv').config();
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const helmet = require('helmet');
const cors = require('cors');

// Environment Variables
const port = process.env.PORT;
const DB = process.env.DB_HOST;

// Modules
const DatabaseConnect = require('./DatabaseConnect');
const typeDefs = require('./GQLModel/Schema');
const resolvers = require('./GQLModel/Resolvers');
const Utils = require('./Utils');

// Models
const DBModel = require('./DBModels');
const ValidationModel = require('./ValidationModels');

// Express App init
const app = express();
app.use(
    helmet({
      contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
    }),
);
app.use(cors());
DatabaseConnect.connect(DB);

// Apollo Server Config
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers.authorization;
    const user = Utils.getUser(token);
    console.log(user);
    return {DBModel, ValidationModel, user};
  },
});
server.applyMiddleware({app, path: '/api'});

// Express API if needed
app.get('/', (req, res) => {
  res.send('Please go to /api');
});

// Start the server
app.listen({port}, () => {
  console.log(`Graphql Express Server started on port ${port}!!!`);
  console.log('CTRL+C to exit the logs and run ./stop.sh to stop the server');
  console.log(`http://localhost:${port}`);
});
