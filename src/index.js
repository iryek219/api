// index.js
// This is the main entry point of our application
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const port = process.env.PORT || 4000;

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

type Pizza {
    id: ID!
    size: String!
    slices: Int!
    toppings: [String]
}

type Note {
    id: ID!
    content: String!
    auther: String!
}

type Query {
    hello: String!
    notes: [Note!]!
}

Query: {
    hello: () => 'Hello world!',
    notes: () => notes
}
let notes = [
    { id: '1', content:'This is a note', auther:'Adam Scott' },
    { id: '2', content: 'This is another note', auther: 'Harlow Everly'},
    { id: '3', content: 'Oh hey look, another note', auther: 'Riley Harrison'}
];

const app = express();

const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'});

app.listen( { port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);