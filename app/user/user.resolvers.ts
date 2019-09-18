import { Roles } from "../../@types/types";
import { authScope } from "../../utils/authScope.utils";
import { UserDAL } from "./user.dal";
import { User } from "../../generated/graphql";

export const me = authScope(
    [Roles.USER],
    async (_p, _d, { USER }): Promise<User> => {
        const user = await new UserDAL({
            _id: USER.ID
        }).findOne();

        return user;
    }
);
