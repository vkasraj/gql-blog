import { UserDAL } from "./../user/user.dal";
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

    const isUserExists = await new UserDAL({ email }).findOne({
        select: "-__v -createdAt -updatedAt"
    });

    if (!isUserExists) {
        throw new Error("Invalid email or password");
    }

    const isPwMatched = await new PasswordUtil(password).verify(
        isUserExists.password
    );

    if (!isPwMatched) {
        throw new Error("Invalid email or password");
    }

    deleteProps(isUserExists, ["password"]);

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

    const isUserExists = await new UserDAL({
        $or: [{ username }, { email }]
    }).findOne({
        select: "username email"
    });

    if (isUserExists) {
        const msg = (type: string) => `User already exists with this ${type}`;

        if (isUserExists.email === email) {
            throw new Error(msg("email"));
        }

        throw new Error(msg("username"));
    }

    const hashed = await new PasswordUtil(password).hash();

    const user = await new UserDAL({
        username,
        email,
        password: hashed
    }).create();

    const token = new TokenUtil({
        ID: user._id
    }).generate();

    return {
        ...user,
        token
    };
};
