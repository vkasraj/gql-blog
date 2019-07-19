// A map of functions which return data for the schema.
const user = {
    _id: "alsdjflaksdjf0",
    email: "vikasraj1911@gmail.com",
    name: "Vikas Raj"
};

const resolvers = {
    Query: {
        hello: () => "world",
        me: () => user
    },
    Mutation: {
        login(parent: object, data: object) {
            console.log(data);

            return user;
        },
        signup(parent: object, data: object) {
            return user;
        }
    }
};

export default resolvers;
