import { authScope } from "../../utils/authScope.utils";
import { TodoDAL } from "./todo.dal";

interface TodoCreateInput {
    data: {
        title: string;
        description: string;
    };
}

interface FindInput {
    where: {
        _id: string;
    };
}

interface TodoUpdateInput extends FindInput {
    data: {
        title?: string;
        description?: string;
        completed?: boolean;
    };
}

export const createTodo = authScope(
    "user",
    async (__, { data }: TodoCreateInput, { USER }) => {
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
    async (__, { where, data }: TodoUpdateInput) => {
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
    async (__, { where }: FindInput) => {
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
