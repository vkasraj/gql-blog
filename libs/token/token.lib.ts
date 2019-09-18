import jwt from "jsonwebtoken";
import { TokenPayload } from "../../@types/types";

interface TokenGeneratePayload {
    secret: string;
    exp: string | number;
    payload: TokenPayload;
}

// For generating Buffer from token payload
const genBuff = (secret: string): Buffer => Buffer.from(secret, "base64");

// Common function for generating token
export const generate = ({ secret, exp, payload }: TokenGeneratePayload) => {
    const $secret = genBuff(secret);

    return jwt.sign(payload, $secret, {
        // algorithm: ["HS256"],
        expiresIn: exp
    });
};

// Common function for verifying token
export const verify = (secret: string, token: string) => {
    const $secret = genBuff(secret);

    return jwt.verify(token, $secret, {
        algorithms: ["HS256"]
    });
};
