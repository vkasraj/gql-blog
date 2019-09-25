import { objectType } from "nexus";

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t) {
        t.field("user", {
            type: "User"
        });
        t.string("token");
    }
});
