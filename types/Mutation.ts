import { createTodo, updateTodo, deleteTodo } from "../app/todo/todo.resolvers";
import { login, signup } from "../app/auth/auth.resolvers";

export const Mutation = {
    login,
    signup,
    createTodo,
    updateTodo,
    deleteTodo
};
