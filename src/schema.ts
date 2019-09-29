import { asNexusMethod, inputObjectType } from "nexus";
import { GraphQLDateTime } from "graphql-iso-date";

export const DateTime = asNexusMethod(GraphQLDateTime, "date");

export const FindInput = inputObjectType({
    name: "FindInput",
    definition(t) {
        t.id("_id", {
            required: true,
        });
    },
});

export * from "../app/auth/auth.schema";
export * from "../app/user/user.schema";
export * from "../app/todo/todo.schema";
