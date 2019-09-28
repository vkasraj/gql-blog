import { Schema, model, Document } from "mongoose";
import { NexusGenRootTypes } from "../../generated/gql.types";

export type UserCreateType = {
    username: string;
    email: string;
    password: string;
};

export type UserModelType = Document & NexusGenRootTypes["User"];

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
