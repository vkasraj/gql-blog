import { DALOptions } from "../../@types/dal.types";
import { UserModel, UserModelType } from "./user.model";
import { deleteProps } from "../../utils/object.util";

export class UserDAL {
    private select: string = "-password -__v -createdAt -updatedAt";

    constructor(private ctx = {}) {}

    async create(): Promise<UserModelType> {
        const newDoc: UserModelType = await new UserModel(this.ctx).save();

        const user = newDoc.toObject();

        return deleteProps<UserModelType>(user, [
            "__v",
            "password",
            "createdAt",
            "updatedAt"
        ]);
    }

    async findOne(options: DALOptions = {}): Promise<UserModelType> {
        const { select = this.select } = options;

        const user: UserModelType = await UserModel.findOne(this.ctx)
            .select(select)
            .lean()
            .exec();

        return user;
    }
}
