import { Schema, model, Document } from "mongoose";

export type UserModel = Document & {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

const user: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        minimize: true
    }
);

export default model<UserModel>("User", user);
