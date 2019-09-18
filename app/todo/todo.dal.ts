import { DALOptions } from "../../@types/types";
import { TodoModelType, TodoModel } from "./todo.model";
import { deleteProps } from "../../utils/object.util";

export class TodoDAL {
    private select: string = "-__v";

    constructor(private ctx = {}) {}

    async create(): Promise<TodoModelType> {
        const doc: TodoModelType = await new TodoModel(this.ctx).save();

        const todo = deleteProps<TodoModelType>(doc, ["__v"]);

        return todo;
    }

    async findAll(options: DALOptions = {}): Promise<TodoModelType[]> {
        const { select = this.select } = options;

        const todos: TodoModelType[] = await TodoModel.find(this.ctx)
            .select(select)
            .lean()
            .exec();

        return todos;
    }

    async findOne(options: DALOptions = {}): Promise<TodoModelType> {
        const { select = this.select } = options;

        const todo: TodoModelType = await TodoModel.findOne(this.ctx)
            .select(select)
            .lean()
            .exec();

        return todo;
    }

    async updateOne(
        data: {},
        options: DALOptions = {}
    ): Promise<TodoModelType> {
        const { select = this.select } = options;

        const todo = await TodoModel.findOneAndUpdate(this.ctx, data, {
            new: true
        })
            .select(select)
            .lean()
            .exec();

        return todo;
    }

    async deleteOne(options: DALOptions = {}): Promise<TodoModelType> {
        const { select = this.select } = options;

        const todo = await TodoModel.findOneAndDelete(this.ctx)
            .select(select)
            .lean()
            .exec();

        return todo;
    }
}
