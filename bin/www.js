const { ApolloServer } = require("apollo-server");

const resolvers = require("../resolvers/resolvers");
const typeDefs = require("../typeDefs/typeDefs");
const { PORT } = require("../config/keys");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen({
        port: PORT
    })
    .then(({ url }) => {
        console.log(`[SERVER::LISTEN] >> ${url}`);
    });
