import { join } from "path";
import { ApolloServer } from "apollo-server";
import { makeSchema } from "nexus";
import * as allTypes from "./schema/index";
import { Context } from "./Context";

const graphqlSchema = makeSchema({
    types: allTypes,
    outputs: {
        schema: join(__dirname, "../generated/schema.graphql"),
        typegen: join(__dirname, "../generated/gql.types.d.ts"),
    },
    typegenAutoConfig: {
        contextType: "ctx.Context",
        sources: [
            {
                alias: "ctx",
                source: join(__dirname, "Context.ts"),
            },
        ],
        backingTypeMap: {
            DateTime: "Date",
        },
    },
});

export const server = new ApolloServer({
    schema: graphqlSchema,
    context: ctx => new Context(ctx),
    introspection: true,
});
