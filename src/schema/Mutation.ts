import { objectType, arg } from "nexus";
import { Roles } from "../../@types/types";

export const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("login", {
            type: "AuthResponse",
            description: "For logging in user",
            args: {
                data: arg({
                    type: "LoginInput",
                    required: true
                })
            },
            resolve: (_, { data }, { authService }) => authService.login(data)
        });

        t.field("signup", {
            type: "AuthResponse",
            description: "For signing up new users",
            args: {
                data: arg({
                    type: "SignupInput",
                    required: true
                })
            },
            resolve: (_, { data }, { authService }) => authService.signup(data)
        });

        t.field("createTodo", {
            type: "Todo",
            description: "For creating a todo",
            args: {
                data: arg({
                    type: "TodoCreateInput",
                    required: true
                })
            },
            authorize: (_, __, { authService }) => {
                return authService.authorize([Roles.USER]);
            },
            resolve: (_, { data }, { todoService }) => {
                return todoService.createTodo(data);
            }
        });

        t.field("updateTodo", {
            type: "Todo",
            description: "For updating a specific todo by providing its _id",
            args: {
                where: arg({
                    type: "FindInput",
                    required: true
                }),
                data: arg({
                    type: "TodoUpdateInput",
                    required: true
                })
            },
            authorize: (_, __, { authService }) => {
                return authService.authorize([Roles.USER]);
            },
            resolve: (_, { where, data }, { todoService }) => {
                return todoService.updateTodo(where._id, data);
            }
        });

        t.field("deleteTodo", {
            type: "Todo",
            description: "For deleting a specific todo by providing its _id",
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
                return todoService.deleteTodo(where._id);
            }
        });
    }
});
