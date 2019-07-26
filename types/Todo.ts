import { UserDAL } from "../app/user/user.dal";

export const Todo = {
    async createdBy({ user }: { user: string }) {
        return await new UserDAL({ _id: user }).findOne();
    }
};
