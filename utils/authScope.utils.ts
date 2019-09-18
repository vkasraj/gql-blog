import { ResolverFn } from "./../generated/graphql";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { Roles, TokenPayload } from "../@types/types";

interface Context {
    USER: TokenPayload;
}

type callback = ResolverFn<any, any, Context, any>;

export const authScope = (roles: Roles[], cb: callback) => (
    parent: any,
    data: any,
    context: Context,
    info: any
) => {
    if (!context.USER) {
        throw new ForbiddenError("Authentication required! Please login.");
    }

    const { ROLE } = context.USER;
    const rolesSet = new Set(roles);

    if (!rolesSet.has(ROLE)) {
        throw new AuthenticationError(
            "You are not authorized to perform this action."
        );
    }

    return cb(parent, data, context, info);
};
