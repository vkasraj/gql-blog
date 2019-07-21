import { login, signup } from "./../app/auth.resolvers";

const resolvers = {
    Query: {
        hello: () => "world",
        me: () => {
            return "me";
        }
    },
    Mutation: {
        login,
        signup
    }
};

export default resolvers;
