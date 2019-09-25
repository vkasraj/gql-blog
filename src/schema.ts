import { join } from "path";
import { makeSchema } from "nexus";
import * as allTypes from "./typeDefs";

export const schema = makeSchema({
    types: allTypes,
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
        ],
        backingTypeMap: {
            DateTime: "Date"
        }
    }
});
