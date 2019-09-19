import { UserDAL } from "../app/user/user.dal";
import { User } from "../generated/graphql";

export const Todo = {
    async createdBy({ userID }: { userID: string }): Promise<User> {
        return await new UserDAL({ _id: userID }).findOne();
    }
};
