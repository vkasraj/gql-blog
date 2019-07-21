import Todo, { TodoModel } from "../models/todo.model";
import { deleteProps } from "../utils/object.util";

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

export const todos = async () => {
    const todos = await Todo.find()
        .select("-__v")
        .lean()
        .lean();

    return todos;
};

export const createTodo = async (__: {}, { data }: TodoCreateInput) => {
    const { title, description } = data;

    const doc = await new Todo({
        user: "5d340bc2c1858d41893c067e",
        title,
        description
    }).save();

    const todo: TodoModel = deleteProps(doc.toObject(), ["__v"]);

    return todo;
};

export const updateTodo = async (__: {}, { where, data }: TodoUpdateInput) => {
    const isTodoExists: TodoModel = await Todo.findOneAndUpdate(
        { _id: where._id },
        data
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
};

export const deleteTodo = async (__: {}, { where }: FindInput) => {
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
};
