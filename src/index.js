// index.js
// This is the main entry point of our application
require('dotenv').config();
const db = require('./db');
const models = require('./models');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const express = require('express');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;


let notes = [
    { id: '1', content:'This is a note', author:'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly'},
    { id: '3', content: 'Oh hey look, another note', author: 'Riley Harrison'}
];




db.connect(DB_HOST);

const app = express();

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => {
        return { models };
    }
});
server.applyMiddleware({ app, path: '/api'});

app.listen( { port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);