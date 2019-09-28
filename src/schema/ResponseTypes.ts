import { objectType, enumType } from "nexus";

export const AuthRoles = enumType({
    name: "AuthRoles",
    description: "Roles for the authenticated users",
    members: ["USER", "ADMIN"]
});

export const AuthInfo = objectType({
    name: "AuthInfo",
    definition(t) {
        t.string("token");
        t.field("role", {
            type: "AuthRoles"
        });
    }
});

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t) {
        t.field("user", {
            type: "User"
        });
        t.field("auth", {
            type: "AuthInfo"
        });
    }
});
