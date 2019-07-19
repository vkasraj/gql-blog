import { ApolloServer } from "apollo-server";
import resolvers from "../resolvers/resolvers";
import typeDefs from "../typeDefs/typeDefs";
import keys from "../config/keys";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen({
        port: keys.PORT
    })
    .then(({ url }: any) => {
        console.log(`[SERVER::LISTEN] >> ${url}`);
    });
