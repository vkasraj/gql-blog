import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import resolvers from "../src/resolvers";
import typeDefs from "../src/typeDefs";
import keys from "../config/keys";
import TokenGenerator from "../utils/token.util";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization;

        let USER = null;
        if (token) {
            USER = TokenGenerator.verify(token);
        }

        return {
            USER
        };
    }
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
