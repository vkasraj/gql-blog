import { asNexusMethod } from "nexus";
import { GraphQLDateTime } from "graphql-iso-date";

export const DateTime = asNexusMethod(GraphQLDateTime, "date");

export * from "./ResponseTypes";
export * from "./InputTypes";
export * from "./TodoSchema";
export * from "./UserSchema";
export * from "./Query";
export * from "./Mutation";
