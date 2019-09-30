import {
    objectType,
    queryField,
    arg,
    mutationField,
    inputObjectType,
} from "nexus";
import { Roles } from "../../@types/types";

export const Todo = objectType({
    name: "Todo",
    definition(t) {
        t.id("_id");
        t.string("title");
        t.string("description");
        t.boolean("completed");
        t.date("createdAt");
        t.date("updatedAt");
        t.field("createdBy", {
            type: "User",
            resolve: ({ userID }, _, { userService }) => {
                return userService.createdBy(userID);
            },
        });
    },
});

export const TodoCreateInput = inputObjectType({
    name: "TodoCreateInput",
    definition(t) {
        t.string("title", { required: true });
        t.string("description", { required: true });
    },
});

export const TodoUpdateInput = inputObjectType({
    name: "TodoUpdateInput",
    definition(t) {
        t.string("title");
        t.string("description");
        t.boolean("completed");
    },
});

export const todos = queryField("todos", {
    type: "Todo",
    list: [false],
    description: "Get all the todos of the current logged in user",
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, __, { todoService }) => todoService.todos(),
});

export const todo = queryField("todo", {
    type: "Todo",
    nullable: true,
    description: "Get a specific todo by providing its _id",
    args: {
        where: arg({
            type: "FindInput",
            required: true,
        }),
    },
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, { where }, { todoService }) => {
        return todoService.todo(where._id);
    },
});

export const createdTodo = mutationField("createTodo", {
    type: "Todo",
    description: "For creating a todo",
    args: {
        data: arg({
            type: "TodoCreateInput",
            required: true,
        }),
    },
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, { data }, { todoService }) => {
        return todoService.createTodo(data);
    },
});

export const updateTodo = mutationField("updateTodo", {
    type: "Todo",
    description: "For updating a specific todo by providing its _id",
    args: {
        where: arg({
            type: "FindInput",
            required: true,
        }),
        data: arg({
            type: "TodoUpdateInput",
            required: true,
        }),
    },
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, { where, data }, { todoService }) => {
        return todoService.updateTodo(where._id, data);
    },
});

export const deleteTodo = mutationField("deleteTodo", {
    type: "Todo",
    description: "For deleting a specific todo by providing its _id",
    args: {
        where: arg({
            type: "FindInput",
            required: true,
        }),
    },
    authorize: (_, __, { authService }) => {
        return authService.authorize([Roles.USER]);
    },
    resolve: (_, { where }, { todoService }) => {
        return todoService.deleteTodo(where._id);
    },
});
