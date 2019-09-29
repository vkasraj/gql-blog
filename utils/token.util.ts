import { AuthenticationError } from "apollo-server";
import { TokenPayload } from "../@types/types";
import { generate, verify } from "../libs/token/token.lib";
import { TOKEN_KEY, TOKEN_EXP } from "../config/keys";

export default class TokenGenerator {
    constructor(private ctx: TokenPayload) {}

    // For generating access token
    generate(): string {
        return generate({
            secret: TOKEN_KEY,
            exp: TOKEN_EXP,
            payload: this.ctx,
        });
    }

    static verify(token: string): TokenPayload {
        try {
            return verify(TOKEN_KEY, token) as TokenPayload;
        } catch (error) {
            throw new AuthenticationError("Unauthorized Access! Please login");
        }
    }
}
