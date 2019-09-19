import { Todo } from "../../generated/graphql";
import { Schema, SchemaTypes, Document, model } from "mongoose";

export type TodoModelType = Document & Todo;

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
