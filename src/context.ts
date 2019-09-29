import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { TokenPayload } from "../@types/types";
import { AuthService } from "../app/auth/auth.service";
import { TodoService } from "../app/todo/todo.service";
import { UserService } from "../app/user/user.service";

export class Context {
    private me: TokenPayload;

    authService = new AuthService(this);

    todoService = new TodoService(this);

    userService = new UserService(this);

    constructor(private ctx: ExpressContext) {}

    get req(): ExpressContext["req"] {
        return this.ctx.req;
    }

    get USER(): TokenPayload {
        return this.me;
    }

    set USER(payload: TokenPayload) {
        this.me = payload;
    }
}
