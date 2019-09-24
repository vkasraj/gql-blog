import { objectType, arg, inputObjectType, scalarType } from "nexus";
import { me } from "../app/user/user.resolvers";
import {
    todo,
    todos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../app/todo/todo.resolvers";
import { createdBy } from "../root/Todo";

scalarType({
    name: "Date",
    serialize: value => value.getTime(),
    parseValue: value => new Date(value),
    parseLiteral: ast => (ast.kind === "IntValue" ? new Date(ast.value) : null),
    asNexusMethod: "date"
});

export const User = objectType({
    name: "User",
    definition(t) {
        t.id("_id");
        t.string("email");
        t.string("username");
    }
});

export const Todo = objectType({
    name: "Todo",
    definition(t) {
        t.id("_id");
        t.string("title");
        t.string("description");
        t.boolean("completed");
        t.field("createdBy", {
            type: User,
            // @ts-ignore
            resolve: createdBy
        });
        t.string("createdAt");
        t.string("updatedAt");
    }
});

export const FindInput = inputObjectType({
    name: "FindInput",
    definition(t) {
        t.id("_id", {
            required: true
        });
    }
});

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t) {
        t.field("user", {
            type: User
        });
        t.string("token");
    }
});

export const LoginInput = inputObjectType({
    name: "LoginInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("password", { required: true });
    }
});

export const SignupInput = inputObjectType({
    name: "SignupInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("username", { required: true });
        t.string("password", { required: true });
    }
});

export const TodoCreateInput = inputObjectType({
    name: "TodoCreateInput",
    definition(t) {
        t.string("title", { required: true });
        t.string("description", { required: true });
    }
});

export const TodoUpdateInput = inputObjectType({
    name: "TodoUpdateInput",
    definition(t) {
        t.string("title");
        t.string("description");
        t.boolean("completed");
    }
});

export const Query = objectType({
    name: "Query",
    definition(t) {
        t.field("me", {
            type: User,
            description: "Will return the current logged in user",
            resolve: me
        });

        t.field("todos", {
            type: Todo,
            list: [false],
            resolve: todos
        });

        t.field("todo", {
            type: Todo,
            nullable: true,
            args: {
                where: arg({
                    type: FindInput,
                    required: true
                })
            },
            resolve: todo
        });
    }
});

export const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("login", {
            type: "AuthResponse",
            args: {
                data: arg({
                    type: LoginInput,
                    required: true
                })
            },
            resolve: (_, { data }, { authService }) => authService.login(data)
        });

        t.field("signup", {
            type: "AuthResponse",
            args: {
                data: arg({
                    type: SignupInput,
                    required: true
                })
            },
            resolve: (_, { data }, { authService }) => authService.signup(data)
        });

        t.field("createTodo", {
            type: Todo,
            args: {
                data: arg({
                    type: TodoCreateInput,
                    required: true
                })
            },
            resolve: createTodo
        });

        t.field("updateTodo", {
            type: Todo,
            args: {
                where: arg({
                    type: FindInput,
                    required: true
                }),
                data: arg({
                    type: TodoUpdateInput,
                    required: true
                })
            },
            resolve: updateTodo
        });

        t.field("deleteTodo", {
            type: Todo,
            args: {
                where: arg({
                    type: FindInput,
                    required: true
                })
            },
            resolve: deleteTodo
        });
    }
});
