import { UserDAL } from "../app/user/user.dal";
import { User } from "../generated/graphql";

export const Todo = {
    async createdBy({ user }: { user: string }): Promise<User> {
        return await new UserDAL({ _id: user }).findOne();
    }
};
