import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import context from "../src/context";
import { PORT, MONGO_URI } from "../config/keys";
import { schema } from "../src/schema";

const server = new ApolloServer({
    schema,
    context
});

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
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
