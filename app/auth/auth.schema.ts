import {
    mutationField,
    arg,
    objectType,
    enumType,
    inputObjectType,
} from "nexus";

export const AuthRoles = enumType({
    name: "AuthRoles",
    description: "Roles for the authenticated users",
    members: ["USER", "ADMIN"],
});

export const AuthInfo = objectType({
    name: "AuthInfo",
    definition(t) {
        t.string("token");
        t.field("role", {
            type: "AuthRoles",
        });
    },
});

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t) {
        t.field("user", {
            type: "User",
        });
        t.field("auth", {
            type: "AuthInfo",
        });
    },
});

export const LoginInput = inputObjectType({
    name: "LoginInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("password", { required: true });
    },
});

export const SignupInput = inputObjectType({
    name: "SignupInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("username", { required: true });
        t.string("password", { required: true });
    },
});

export const login = mutationField("login", {
    type: "AuthResponse",
    description: "For logging in user",
    args: {
        data: arg({
            type: "LoginInput",
            required: true,
        }),
    },
    resolve: (_, { data }, { authService }) => authService.login(data),
});

export const signup = mutationField("signup", {
    type: "AuthResponse",
    description: "For signing up new users",
    args: {
        data: arg({
            type: "SignupInput",
            required: true,
        }),
    },
    resolve: (_, { data }, { authService }) => authService.signup(data),
});
