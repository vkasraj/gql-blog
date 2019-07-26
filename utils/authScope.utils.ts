import { AuthenticationError, ForbiddenError } from "apollo-server";

interface Context {
    USER: {
        ID: string;
        ROLE: string[];
    };
}

export const authScope = <T extends object>(
    role: "user" | "admin",
    cb: (parent: any, data: any, context: Context, info: any) => any
) => (parent: any, data: any, context: Context, info: any): T => {
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
