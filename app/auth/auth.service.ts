import { UserDAL } from "../user/user.dal";
import TokenUtil from "../../utils/token.util";
import PasswordUtil from "../../utils/password.util";
import { deleteProps } from "../../utils/object.util";
import { Roles } from "../../@types/types";
import { NexusGenInputs, NexusGenRootTypes } from "../../generated/gql.types";
import { Context } from "../../src/Context";
import { ForbiddenError, AuthenticationError } from "apollo-server";
import TokenGenerator from "../../utils/token.util";

export class AuthService {
    constructor(private readonly ctx: Context) {}

    private get token() {
        return this.ctx.req.headers.authorization;
    }

    async authorize(roles: Roles[]): Promise<boolean> {
        try {
            const token = this.token;

            if (!token) {
                throw new ForbiddenError(
                    "Authentication required! Please login."
                );
            }

            const decodedToken = TokenGenerator.verify(token as string);

            const rolesSet = new Set(roles);

            if (!rolesSet.has(decodedToken.ROLE)) {
                throw new AuthenticationError(
                    "You are not authorized to perform this action."
                );
            }

            this.ctx.USER = decodedToken;

            return true;
        } catch (error) {
            throw error;
        }
    }

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

        const user = await new UserDAL().create({
            username,
            email,
            password: hashed
        });

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
