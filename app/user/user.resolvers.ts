import User, { UserModel } from "./user.model";
import { authScope } from "../../utils/authScope.utils";

export const me = authScope("user", async (_p, _d, { USER }) => {
    const user: UserModel = await User.findOne({
        _id: USER.ID
    })
        .select("-password -__v -createdAt -updatedAt")
        .lean()
        .exec();

    return user;
});
