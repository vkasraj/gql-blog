import { Schema, SchemaTypes, Document, model } from "mongoose";

export type TodoModelType = Document & {
    user: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
};

const todo = new Schema(
    {
        user: {
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
