import { me } from "./../app/user/user.resolvers";
import { login, signup } from "../app/auth/auth.resolvers";
import {
    todos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../app/todo/todo.resolvers";

const resolvers = {
    Query: {
        me,
        todos
    },
    Mutation: {
        login,
        signup,
        createTodo,
        updateTodo,
        deleteTodo
    }
};

export default resolvers;
