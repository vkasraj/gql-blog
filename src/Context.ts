import { AuthService } from "../app/auth/auth.service";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import TokenGenerator from "../utils/token.util";
import { TokenPayload } from "../@types/types";

export class Context {
    authService = new AuthService(this);

    constructor(private ctx: ExpressContext) {}

    private get req() {
        return this.ctx.req;
    }

    get USER(): TokenPayload {
        const token = this.req.headers.authorization;

        return TokenGenerator.verify(token as string);
    }
}
