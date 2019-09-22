import { AuthenticationError, ForbiddenError } from "apollo-server";
import { Roles, TokenPayload } from "../@types/types";
import { GraphQLFieldResolver } from "graphql";

interface Context {
    USER: TokenPayload;
}

type Resolver<T> = GraphQLFieldResolver<T, Context, any>;

type AuthScope = <T extends object>(
    roles: Roles[],
    callback: Resolver<T>
) => Resolver<T>;

export const authScope: AuthScope = (roles, callback) => (
    source,
    args,
    context,
    info
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

    return callback(source, args, context, info);
};
