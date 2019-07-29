import { ResolverFn } from "./../generated/graphql";
import { AuthenticationError, ForbiddenError } from "apollo-server";

interface Context {
    USER: {
        ID: string;
        ROLE: string[];
    };
}

type role = "user" | "admin";
type cb = ResolverFn<any, any, Context, any>;

export const authScope = (role: role, cb: cb) => (
    parent: any,
    data: any,
    context: Context,
    info: any
) => {
    if (!context.USER) {
        throw new ForbiddenError("Authentication required! Please login.");
    }

    if (!context.USER.ROLE.includes(role)) {
        throw new AuthenticationError(
            "You are not authorized to perform this action."
        );
    }

    return cb(parent, data, context, info);
};
