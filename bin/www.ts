import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import resolvers from "../resolvers/resolvers";
import typeDefs from "../typeDefs/typeDefs";
import keys from "../config/keys";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(keys.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("[MONGO] >> Connected");

        server
            .listen({
                port: keys.PORT
            })
            .then(({ url }: any) => {
                console.log(`[SERVER] >> Connected ~ ${url}`);
            });
    })
    .catch((error: Error) => {
        throw error;
    });
