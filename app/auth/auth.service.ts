import { UserDAL } from "../user/user.dal";
import TokenUtil from "../../utils/token.util";
import PasswordUtil from "../../utils/password.util";
import { deleteProps } from "../../utils/object.util";
import { Roles } from "../../@types/types";
import { NexusGenInputs, NexusGenRootTypes } from "../../generated/gql.types";

export class AuthService {
    async login(
        data: NexusGenInputs["LoginInput"]
    ): Promise<NexusGenRootTypes["AuthResponse"]> {
        const { email, password } = data;

        const isUserExists = await new UserDAL({ email }).findOne({
            select: "-__v -createdAt -updatedAt"
        });

        if (!isUserExists) {
            throw new Error("Invalid email or password");
        }

        const isPwMatched = await new PasswordUtil(password).verify(
            isUserExists.password as string
        );

        if (!isPwMatched) {
            throw new Error("Invalid email or password");
        }

        deleteProps(isUserExists, ["password"]);

        const token = new TokenUtil({
            ID: isUserExists._id,
            ROLE: Roles.USER
        }).generate();

        return {
            user: isUserExists,
            token
        };
    }

    async signup(
        data: NexusGenInputs["SignupInput"]
    ): Promise<NexusGenRootTypes["AuthResponse"]> {
        const { username, email, password } = data;

        const isUserExists = await new UserDAL({
            $or: [{ username }, { email }]
        }).findOne({
            select: "username email"
        });

        if (isUserExists) {
            const msg = (type: string) =>
                `User already exists with this ${type}`;

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
            ID: user._id,
            ROLE: Roles.USER
        }).generate();

        return {
            user,
            token
        };
    }
}
