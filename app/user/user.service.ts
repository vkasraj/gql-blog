import { Context } from "../../src/Context";
import { UserDAL } from "./user.dal";
import { NexusGenRootTypes } from "../../generated/gql.types";

export class UserService {
    constructor(private ctx: Context) {}

    private get ID() {
        return this.ctx.USER.ID;
    }

    me(): Promise<NexusGenRootTypes["User"]> {
        return new UserDAL({ _id: this.ID }).findOne();
    }

    createdBy(_id: string): Promise<NexusGenRootTypes["User"]> {
        return new UserDAL({ _id }).findOne();
    }
}
