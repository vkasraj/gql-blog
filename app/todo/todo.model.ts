import { Schema, SchemaTypes, Document, model } from "mongoose";
import { NexusGenRootTypes } from "../../generated/gql.types";

export type TodoCreateType = {
    userID: string;
    title: string;
    description: string;
    completed?: boolean;
};

export type TodoModelType = Document & NexusGenRootTypes["Todo"];

const todo = new Schema(
    {
        userID: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        minimize: true,
        timestamps: true
    }
);

export const TodoModel = model<TodoModelType>("Todo", todo);
