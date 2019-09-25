import { objectType, arg } from "nexus";

export const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("login", {
            type: "AuthResponse",
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
            args: {
                data: arg({
                    type: "TodoCreateInput",
                    required: true
                })
            },
            resolve: (_, { data }, { todoService }) => {
                return todoService.createTodo(data);
            }
        });

        t.field("updateTodo", {
            type: "Todo",
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
            resolve: (_, { where, data }, { todoService }) => {
                return todoService.updateTodo(where._id, data);
            }
        });

        t.field("deleteTodo", {
            type: "Todo",
            args: {
                where: arg({
                    type: "FindInput",
                    required: true
                })
            },
            resolve: (_, { where }, { todoService }) => {
                return todoService.deleteTodo(where._id);
            }
        });
    }
});
