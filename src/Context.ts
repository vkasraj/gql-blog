import { AuthService } from "../app/auth/auth.service";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import TokenGenerator from "../utils/token.util";
import { TokenPayload } from "../@types/types";
import { TodoService } from "../app/todo/todo.service";
import { ForbiddenError } from "apollo-server";
import { UserService } from "../app/user/user.service";

export class Context {
    authService = new AuthService();
    todoService = new TodoService(this);
    userService = new UserService(this);

    constructor(private ctx: ExpressContext) {}

    private get req() {
        return this.ctx.req;
    }

    get USER(): TokenPayload {
        const token = this.req.headers.authorization;

        if (!token) {
            throw new ForbiddenError("Authentication required! Please login.");
        }

        return TokenGenerator.verify(token as string);
    }
}
