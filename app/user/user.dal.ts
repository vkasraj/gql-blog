import { UserModel, UserModelType } from "./user.model";
import { RootDAL } from "../../utils/root.dal";

export class UserDAL extends RootDAL<UserModelType> {
    constructor(ctx: object) {
        super(UserModel, ctx);
    }
}
