import { AuthenticationError } from "apollo-server";
import { generate, verify } from "../libs/token/token.lib";
import keys from "../config/keys";

export default class TokenGenerator {
    constructor(private ctx: {}) {}

    // For generating access token
    generate(): string {
        try {
            const accessToken = generate({
                secret: keys.TOKEN.KEY,
                exp: keys.TOKEN.EXP,
                payload: {
                    ...this.ctx,
                    ROLE: ["user"]
                }
            });

            return accessToken;
        } catch (error) {
            throw error;
        }
    }

    static verify(token: string) {
        try {
            return verify(keys.TOKEN.KEY, token);
        } catch (error) {
            throw new AuthenticationError("Unauthorized Access! Please login");
        }
    }
}
