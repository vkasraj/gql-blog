import Todo, { TodoModel } from "./../app/todo/todo.model";

export const User = {
    async todos({ _id }: { _id: string }) {
        const todos: TodoModel[] = await Todo.find({ user: _id })
            .select("-__v")
            .lean()
            .exec();

        return todos;
    }
};
