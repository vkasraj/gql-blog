import {
    todos,
    createTodo,
    updateTodo,
    deleteTodo
} from "./../app/todo.resolvers";
import { login, signup } from "./../app/auth.resolvers";

const resolvers = {
    Query: {
        hello: () => "world",
        me: () => {
            return "me";
        },
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
