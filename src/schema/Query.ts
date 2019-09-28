import { objectType, arg } from "nexus";
import { Roles } from "../../@types/types";

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("me", {
            type: "User",
            description: "Get the current logged in user",
            authorize: (_, __, { authService }) => {
                return authService.authorize([Roles.USER]);
            },
            resolve: (_, __, { userService }) => userService.me()
        });

        t.field("todos", {
            type: "Todo",
            list: [false],
            description: "Get all the todos of the current logged in user",
            authorize: (_, __, { authService }) => {
                return authService.authorize([Roles.USER]);
            },
            resolve: (_, __, { todoService }) => todoService.todos()
        });

        t.field("todo", {
            type: "Todo",
            nullable: true,
            description: "Get a specific todo by providing its _id",
            args: {
                where: arg({
                    type: "FindInput",
                    required: true
                })
            },
            authorize: (_, __, { authService }) => {
                return authService.authorize([Roles.USER]);
            },
            resolve: (_, { where }, { todoService }) => {
                return todoService.todo(where._id);
            }
        });
    }
});
