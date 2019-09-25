import { NexusGenInputs } from "../../generated/gql.types";
import { Context } from "../../src/Context";
import { TodoDAL } from "./todo.dal";

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

    createTodo(data: NexusGenInputs["TodoCreateInput"]) {
        const { title, description } = data;

        return new TodoDAL().create({
            userID: this.ID,
            title,
            description
        });
    }

    async updateTodo(_id: string, data: NexusGenInputs["TodoUpdateInput"]) {
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
