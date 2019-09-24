import { Context } from "../../src/Context";
import { UserDAL } from "./user.dal";

export class UserService {
    constructor(private ctx: Context) {}

    private get ID() {
        return this.ctx.USER.ID;
    }

    me() {
        return new UserDAL({ _id: this.ID }).findOne();
    }

    createdBy(_id: string) {
        return new UserDAL({ _id }).findOne();
    }
}
