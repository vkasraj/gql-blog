import { objectType, arg } from "nexus";

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("me", {
            type: "User",
            description: "Will return the current logged in user",
            resolve: (_, __, { userService }) => userService.me()
        });

        t.field("todos", {
            type: "Todo",
            list: [false],
            resolve: (_, __, { todoService }) => todoService.todos()
        });

        t.field("todo", {
            type: "Todo",
            nullable: true,
            args: {
                where: arg({
                    type: "FindInput",
                    required: true
                })
            },
            resolve: (_, { where }, { todoService }) => {
                return todoService.todo(where._id);
            }
        });
    }
});
