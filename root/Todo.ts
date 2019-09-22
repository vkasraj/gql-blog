import { UserDAL } from "../app/user/user.dal";
import { User } from "../generated/graphql";

export const createdBy = ({ userID }: { userID: string }): Promise<User> => {
    return new UserDAL({ _id: userID }).findOne();
};
