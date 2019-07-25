import Todo, { TodoModel } from "./todo.model";
import { deleteProps } from "../../utils/object.util";
import { authScope } from "../../utils/authScope.utils";

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
    };
}

export const createTodo = authScope(
    "user",
    async (__, { data }: TodoCreateInput, { USER }) => {
        const { title, description } = data;

        const doc = await new Todo({
            user: USER.ID,
            title,
            description
        }).save();

        const todo: TodoModel = deleteProps(doc.toObject(), ["__v"]);

        return todo;
    }
);

export const updateTodo = authScope(
    "user",
    async (__, { where, data }: TodoUpdateInput) => {
        const isTodoExists: TodoModel = await Todo.findOneAndUpdate(
            { _id: where._id },
            data,
            { new: true }
        )
            .select("-__v")
            .lean()
            .exec();

        if (!isTodoExists) {
            return new Error(
                "Unable to update todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }
);

export const deleteTodo = authScope(
    "user",
    async (__, { where }: FindInput) => {
        const isTodoExists: TodoModel = await Todo.findOneAndDelete({
            _id: where._id
        })
            .select("-__v")
            .lean()
            .exec();

        if (!isTodoExists) {
            return new Error(
                "Unable to delete todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }
);
