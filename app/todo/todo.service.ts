import { Context } from "../../src/Context";
import { TodoDAL } from "./todo.dal";
import { TodoCreateInput, TodoUpdateInput } from "../../generated/graphql";

export class TodoService {
    constructor(private ctx: Context) {}

    private get ID() {
        return this.ctx.USER.ID;
    }

    todos() {
        return new TodoDAL({
            userID: this.ID
        }).findAll();
    }

    async todo(_id: string) {
        const todo = await new TodoDAL({
            _id,
            userID: this.ID
        }).findOne();

        if (!todo) {
            throw new Error("Todo doesn't exists with this _id");
        }

        return todo;
    }

    createTodo(data: TodoCreateInput) {
        const { title, description } = data;

        return new TodoDAL({
            userID: this.ID,
            title,
            description
        }).create();
    }

    async updateTodo(_id: string, data: TodoUpdateInput) {
        const isTodoExists = await new TodoDAL({
            _id,
            userID: this.ID
        }).updateOne(data);

        if (!isTodoExists) {
            throw new Error(
                "Unable to update todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }

    async deleteTodo(_id: string) {
        const isTodoExists = await new TodoDAL({
            _id,
            userID: this.ID
        }).deleteOne();

        if (!isTodoExists) {
            throw new Error(
                "Unable to delete todo with this _id as it doesn't exists"
            );
        }

        return isTodoExists;
    }
}
