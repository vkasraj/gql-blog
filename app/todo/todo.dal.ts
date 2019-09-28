import { TodoModelType, TodoModel, TodoCreateType } from "./todo.model";
import { RootDAL } from "../../utils/root.dal";
import { NexusGenRootTypes } from "../../generated/gql.types";

export class TodoDAL extends RootDAL<
    TodoModelType,
    TodoCreateType,
    NexusGenRootTypes["Todo"]
> {
    constructor(ctx: object = {}) {
        super(TodoModel, ctx);
    }
}
