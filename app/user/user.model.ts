import { Schema, model, Document } from "mongoose";

export type UserModelType = Document & {
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

export const UserModel = model<UserModelType>("User", user);
