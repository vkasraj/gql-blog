import { join } from "path";
import { makeSchema } from "nexus";
import {
    Query,
    Mutation,
    User,
    Todo,
    FindInput,
    AuthResponse,
    LoginInput,
    SignupInput,
    TodoCreateInput,
    TodoUpdateInput
} from "./typeDefs";

export const schema = makeSchema({
    types: [
        User,
        Todo,
        FindInput,
        AuthResponse,
        LoginInput,
        SignupInput,
        TodoCreateInput,
        TodoUpdateInput,
        Query,
        Mutation
    ],
    outputs: {
        schema: join(__dirname, "../generated/schema.graphql"),
        typegen: join(__dirname, "../generated/gql.types.d.ts")
    },
    typegenAutoConfig: {
        contextType: "ctx.Context",
        sources: [
            {
                alias: "ctx",
                source: join(__dirname, "Context.ts")
            }
        ]
    }
});
