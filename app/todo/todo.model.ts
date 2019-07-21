import { Schema, SchemaTypes, Document, model } from "mongoose";

export type TodoModel = Document & {
    user: string;
    title: string;
    description: string;
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
        }
    },
    {
        minimize: true,
        timestamps: true
    }
);

export default model<TodoModel>("Todo", todo);
