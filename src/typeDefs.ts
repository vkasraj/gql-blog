import { gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
    # ===== Resolvers =====

    type Query {
        "A simple type for getting started!"
        me: User!
    }

    type Mutation {
        # This is a comment
        """
        This is the description
        """
        login(data: LoginInput!): AuthPayload!
        signup(data: SignupInput!): AuthPayload!
        createTodo(data: TodoCreateInput!): Todo!
        updateTodo(where: FindInput!, data: TodoUpdateInput!): Todo!
        deleteTodo(where: FindInput!): Todo!
    }

    # ===== Object Types =====

    type AuthPayload {
        _id: ID!
        email: String!
        username: String!
        token: String!
    }

    type User {
        _id: ID!
        email: String!
        username: String!
        todos: [Todo]
    }

    type Todo {
        _id: ID!
        title: String!
        description: String!
        completed: Boolean!
        createdBy: User!
        createdAt: String!
        updatedAt: String!
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
        completed: Boolean
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input SignupInput {
        username: String!
        email: String!
        password: String!
    }
`;

export default typeDefs;
