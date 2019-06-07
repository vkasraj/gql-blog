const { gql } = require("apollo-server");

// The GraphQL schema
const typeDefs = gql`
    # ===== Resolvers =====

    type Query {
        "A simple type for getting started!"
        hello: String
    }

    type Mutation {
        # This is a comment
        """
        This is the description
        """
        login(data: LoginInput!): User!
        signup(data: SignupInput!): User!
        createTodo(data: TodoCreateInput!): Todo!
        updateTodo(data: TodoUpdateInput!): Todo!
        deleteTodo(data: FindInput!): Todo!
    }

    # ===== Object Types =====

    type User {
        _id: ID!
        email: String!
        name: String!
    }

    type Todo {
        _id: ID!
        title: String!
        description: String!
    }

    # ===== Input Types =====

    input FindInput {
        _id: ID!
    }

    input TodoCreateInput {
        title: String!
        description: String!
    }

    input TodoUpdateInput {
        title: String
        description: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input SignupInput {
        name: String!
        email: String!
        password: String!
    }
`;

module.exports = typeDefs;
