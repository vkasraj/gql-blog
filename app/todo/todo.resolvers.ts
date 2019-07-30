import { authScope } from "../../utils/authScope.utils";
import { TodoDAL } from "./todo.dal";
import {
    QueryTodoArgs,
    MutationCreateTodoArgs,
    MutationUpdateTodoArgs,
    MutationDeleteTodoArgs,
    Todo
} from "../../generated/graphql";

export const todo = authScope(
    "user",
    async (_, { where }: QueryTodoArgs, { USER }): Promise<Todo> => {
        const todo = await new TodoDAL({
            _id: where._id,
            user: USER.ID
        }).findOne();

        if (!todo) {
            throw new Error("Todo doesn't exists with this _id");
        }

        return todo;
    }
);

export const todos = authScope(
    "user",
    async (_, __, { USER }): Promise<Todo[]> => {
        const todos = await new TodoDAL({
            user: USER.ID
        }).findAll();

        return todos;
    }
);

export const createTodo = authScope(
    "user",
    async (__, { data }: MutationCreateTodoArgs, { USER }): Promise<Todo> => {
        const { title, description } = data;

        const todo = await new TodoDAL({
            user: USER.ID,
            title,
            description
        }).create();

        return todo;
    }
);

export const updateTodo = authScope(
    "user",
    async (__, { where, data }: MutationUpdateTodoArgs): Promise<Todo> => {
        const isTodoExists = await new TodoDAL({ _id: where._id }).updateOne(
            data
        );

        if (!isTodoExists) {
            throw new Error(
                "Unable to update todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }
);

export const deleteTodo = authScope(
    "user",
    async (__, { where }: MutationDeleteTodoArgs): Promise<Todo> => {
        const isTodoExists = await new TodoDAL({
            _id: where._id
        }).deleteOne();

        if (!isTodoExists) {
            throw new Error(
                "Unable to delete todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }
);
