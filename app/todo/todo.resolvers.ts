import { authScope } from "../../utils/authScope.utils";
import { TodoDAL } from "./todo.dal";
import {
    QueryTodoArgs,
    MutationCreateTodoArgs,
    MutationUpdateTodoArgs,
    MutationDeleteTodoArgs
} from "../../generated/graphql";

export const todo = authScope(
    "user",
    async (_, { where }: QueryTodoArgs, { USER }) => {
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

export const todos = authScope("user", async (_, __, { USER }) => {
    const todos = await new TodoDAL({
        user: USER.ID
    }).findAll();

    return todos;
});

export const createTodo = authScope(
    "user",
    async (__, { data }: MutationCreateTodoArgs, { USER }) => {
        const { title, description } = data;

        const doc = await new TodoDAL({
            user: USER.ID,
            title,
            description
        }).create();

        return doc;
    }
);

export const updateTodo = authScope(
    "user",
    async (__, { where, data }: MutationUpdateTodoArgs) => {
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
    async (__, { where }: MutationDeleteTodoArgs) => {
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
