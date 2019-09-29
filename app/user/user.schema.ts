import { queryField, objectType } from "nexus";
import { Roles } from "../../@types/types";

export const User = objectType({
    name: "User",
    definition(t) {
        t.id("_id");
        t.string("email");
        t.string("username");
    },
});

export const me = queryField("me", {
    type: "User",
    description: "Get the current logged in user",
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, __, { userService }) => userService.me(),
});
