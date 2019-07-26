import { authScope } from "../../utils/authScope.utils";
import { UserDAL } from "./user.dal";

export const me = authScope("user", async (_p, _d, { USER }) => {
    const user = await new UserDAL({
        _id: USER.ID
    }).findOne();

    return user;
});
