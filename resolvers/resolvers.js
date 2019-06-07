// A map of functions which return data for the schema.
const user = {
    _id: "alsdjflaksdjf0",
    email: "vikasraj1911@gmail.com",
    name: "Vikas Raj"
};

const resolvers = {
    Query: {
        hello: () => "world"
    },
    Mutation: {
        login(parent, { data }, context, info) {
            return user;
        },
        signup(parent, { data }, context, info) {
            return user;
        }
    }
};

module.exports = resolvers;
