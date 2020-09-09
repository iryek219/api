// index.js
// This is the main entry point of our application
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const port = process.env.PORT || 4002;

let notes = [
    { id: '1', content:'This is a note', auther:'Adam Scott' },
    { id: '2', content: 'This is another note', auther: 'Harlow Everly'},
    { id: '3', content: 'Oh hey look, another note', auther: 'Riley Harrison'}
];

const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        auther: String!
    }
    type Query {
        hello: String!
        notes: [Note!]!
        note(id:ID!): Note!
    }
    type Mutation {
        newNote(content: String!): Note!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    }, 
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length+1),
                content: args.content,
                author: "Adam"
            };
            notes.push(noteValue);
            return noteValue;
        }
    }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app, path: '/api'});

app.listen( { port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);