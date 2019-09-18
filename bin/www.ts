import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "../src/typeDefs";
import resolvers from "../src/resolvers";
import context from "../src/context";
import { PORT, MONGO_URI } from "../config/keys";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("[MONGO] >> Connected");

        server
            .listen({
                port: PORT
            })
            .then(({ url }: any) => {
                console.log(`[SERVER] >> Connected ~ ${url}`);
            });
    })
    .catch((error: Error) => {
        throw error;
    });
