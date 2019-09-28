import { inputObjectType } from "nexus";

export const FindInput = inputObjectType({
    name: "FindInput",
    definition(t) {
        t.id("_id", {
            required: true
        });
    }
});

export const LoginInput = inputObjectType({
    name: "LoginInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("password", { required: true });
    }
});

export const SignupInput = inputObjectType({
    name: "SignupInput",
    definition(t) {
        t.string("email", { required: true });
        t.string("username", { required: true });
        t.string("password", { required: true });
    }
});

export const TodoCreateInput = inputObjectType({
    name: "TodoCreateInput",
    definition(t) {
        t.string("title", { required: true });
        t.string("description", { required: true });
    }
});

export const TodoUpdateInput = inputObjectType({
    name: "TodoUpdateInput",
    definition(t) {
        t.string("title");
        t.string("description");
        t.boolean("completed");
    }
});
