import User, { UserModel } from "./../app/user/user.model";

export const Todo = {
    async createdBy({ user }: { user: string }) {
        const data: UserModel = await User.findOne({ _id: user })
            .select("-__v -password -createdAt -updatedAt")
            .lean()
            .exec();

        return data;
    }
};
