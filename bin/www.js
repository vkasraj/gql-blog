const { ApolloServer, gql } = require("apollo-server");

const { PORT } = require("../config/keys");

// The GraphQL schema
const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => "world"
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen({
        port: PORT
    })
    .then(({ url }) => {
        console.log(`🚀 > Server ready at ${url}`);
    });
