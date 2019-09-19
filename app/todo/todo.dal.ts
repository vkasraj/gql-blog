import { TodoModelType, TodoModel } from "./todo.model";
import { RootDAL } from "../../utils/root.dal";

export class TodoDAL extends RootDAL<TodoModelType> {
    constructor(ctx: object) {
        super(TodoModel, ctx);
    }
}
