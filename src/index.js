require('dotenv').config();
const express = require('express');
const {ApolloServer} = require("apollo-server-express");
const helmet = require("helmet");
const cors = require('cors');
const db = require("./db")

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const port=process.env.PORT;
const DB_HOST = process.env.ATLAS_DB;

const app = express();

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(cors());

db.connect(DB_HOST);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({app, path: "/api"})

app.listen({port}, () => {
    console.log("Graphql Server running");
})
