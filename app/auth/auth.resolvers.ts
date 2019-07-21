import User, { UserModel } from "../user/user.model";
import TokenUtil from "../../utils/token.util";
import { deleteProps } from "../../utils/object.util";
import PasswordUtil from "../../utils/password.util";

interface Signup {
    data: {
        username: string;
        email: string;
        password: string;
    };
}
interface Login {
    data: {
        email: string;
        password: string;
    };
}

export const login = async (__: object, { data }: Login) => {
    const { email, password } = data;

    const isUserExists = await User.findOne({
        email
    })
        .select("-__v -createdAt -updatedAt")
        .lean()
        .exec();

    if (!isUserExists) {
        return new Error("Invalid email or password");
    }

    const isPwMatched = await new PasswordUtil(password).verify(
        isUserExists.password
    );

    if (!isPwMatched) {
        return new Error("Invalid email or password");
    }

    const token = new TokenUtil({
        ID: isUserExists._id
    }).generate();

    return {
        ...isUserExists,
        token
    };
};

export const signup = async (__: object, { data }: Signup) => {
    const { username, email, password } = data;

    const isUserExists = await User.findOne({
        $or: [{ username }, { email }]
    })
        .select("username email")
        .lean()
        .exec();

    if (isUserExists) {
        const msg = (type: string) => `User already exists with this ${type}`;

        if (isUserExists.email === email) {
            return new Error(msg("email"));
        }

        return new Error(msg("username"));
    }

    const hashed = await new PasswordUtil(password).hash();

    const doc = await new User({
        username,
        email,
        password: hashed
    }).save();

    const user: UserModel = deleteProps(doc.toObject(), [
        "password",
        "__v",
        "createdAt",
        "updatedAt"
    ]);

    const token = new TokenUtil({
        ID: user._id
    }).generate();

    return {
        ...user,
        token
    };
};
