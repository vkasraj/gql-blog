import { UserModel, UserModelType, UserCreateType } from "./user.model";
import { RootDAL } from "../../utils/root.dal";
import { NexusGenRootTypes } from "../../generated/gql.types";

export class UserDAL extends RootDAL<
    UserModelType,
    UserCreateType,
    NexusGenRootTypes["User"] & { password?: string }
> {
    constructor(ctx: object = {}) {
        super(UserModel, ctx);
    }
}
