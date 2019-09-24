/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */

import * as ctx from "../src/Context"


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  FindInput: { // input type
    _id: string; // ID!
  }
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  SignupInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  TodoCreateInput: { // input type
    description: string; // String!
    title: string; // String!
  }
  TodoUpdateInput: { // input type
    completed?: boolean | null; // Boolean
    description?: string | null; // String
    title?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthResponse: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Todo: { // root type
    _id: string; // ID!
    completed: boolean; // Boolean!
    createdAt: string; // String!
    description: string; // String!
    title: string; // String!
    updatedAt: string; // String!
    userID: string; // String!
  }
  User: { // root type
    _id: string; // ID!
    email: string; // String!
    username: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  FindInput: NexusGenInputs['FindInput'];
  LoginInput: NexusGenInputs['LoginInput'];
  SignupInput: NexusGenInputs['SignupInput'];
  TodoCreateInput: NexusGenInputs['TodoCreateInput'];
  TodoUpdateInput: NexusGenInputs['TodoUpdateInput'];
}

export interface NexusGenFieldTypes {
  AuthResponse: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createTodo: NexusGenRootTypes['Todo']; // Todo!
    deleteTodo: NexusGenRootTypes['Todo']; // Todo!
    login: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    signup: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    updateTodo: NexusGenRootTypes['Todo']; // Todo!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User']; // User!
    todo: NexusGenRootTypes['Todo'] | null; // Todo
    todos: Array<NexusGenRootTypes['Todo'] | null>; // [Todo]!
  }
  Todo: { // field return type
    _id: string; // ID!
    completed: boolean; // Boolean!
    createdAt: string; // String!
    createdBy: NexusGenRootTypes['User']; // User!
    description: string; // String!
    title: string; // String!
    updatedAt: string; // String!
    userID: string; // String!
  }
  User: { // field return type
    _id: string; // ID!
    email: string; // String!
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTodo: { // args
      data: NexusGenInputs['TodoCreateInput']; // TodoCreateInput!
    }
    deleteTodo: { // args
      where: NexusGenInputs['FindInput']; // FindInput!
    }
    login: { // args
      data: NexusGenInputs['LoginInput']; // LoginInput!
    }
    signup: { // args
      data: NexusGenInputs['SignupInput']; // SignupInput!
    }
    updateTodo: { // args
      data: NexusGenInputs['TodoUpdateInput']; // TodoUpdateInput!
      where: NexusGenInputs['FindInput']; // FindInput!
    }
  }
  Query: {
    todo: { // args
      where: NexusGenInputs['FindInput']; // FindInput!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthResponse" | "Mutation" | "Query" | "Todo" | "User";

export type NexusGenInputNames = "FindInput" | "LoginInput" | "SignupInput" | "TodoCreateInput" | "TodoUpdateInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}