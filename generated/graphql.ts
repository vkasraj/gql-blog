import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  user: User;
  token: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type FindInput = {
  _id: Scalars["ID"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** This is the description */
  login: AuthResponse;
  signup: AuthResponse;
  createTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Todo;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationSignupArgs = {
  data: SignupInput;
};

export type MutationCreateTodoArgs = {
  data: TodoCreateInput;
};

export type MutationUpdateTodoArgs = {
  where: FindInput;
  data: TodoUpdateInput;
};

export type MutationDeleteTodoArgs = {
  where: FindInput;
};

export type Query = {
  __typename?: "Query";
  /** A simple type for getting started! */
  me: User;
  todos: Array<Maybe<Todo>>;
  todo?: Maybe<Todo>;
};

export type QueryTodoArgs = {
  where: FindInput;
};

export type SignupInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Todo = {
  __typename?: "Todo";
  _id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  completed: Scalars["Boolean"];
  createdBy: User;
  createdAt: Scalars["Date"];
  updatedAt: Scalars["Date"];
};

export type TodoCreateInput = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type TodoUpdateInput = {
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  completed?: Maybe<Scalars["Boolean"]>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"];
  email: Scalars["String"];
  username: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Todo: ResolverTypeWrapper<Todo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  FindInput: FindInput;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  SignupInput: SignupInput;
  TodoCreateInput: TodoCreateInput;
  TodoUpdateInput: TodoUpdateInput;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Todo: Todo;
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
  FindInput: FindInput;
  Mutation: {};
  LoginInput: LoginInput;
  AuthResponse: AuthResponse;
  SignupInput: SignupInput;
  TodoCreateInput: TodoCreateInput;
  TodoUpdateInput: TodoUpdateInput;
  CacheControlScope: CacheControlScope;
  Upload: Scalars["Upload"];
  Int: Scalars["Int"];
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars["Int"]>>;
    scope?: Maybe<Maybe<CacheControlScope>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResponseResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["AuthResponse"]
> = {
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Mutation"]
> = {
  login?: Resolver<
    ResolversTypes["AuthResponse"],
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
  signup?: Resolver<
    ResolversTypes["AuthResponse"],
    ParentType,
    ContextType,
    MutationSignupArgs
  >;
  createTodo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    MutationCreateTodoArgs
  >;
  updateTodo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    MutationUpdateTodoArgs
  >;
  deleteTodo?: Resolver<
    ResolversTypes["Todo"],
    ParentType,
    ContextType,
    MutationDeleteTodoArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  todos?: Resolver<
    Array<Maybe<ResolversTypes["Todo"]>>,
    ParentType,
    ContextType
  >;
  todo?: Resolver<
    Maybe<ResolversTypes["Todo"]>,
    ParentType,
    ContextType,
    QueryTodoArgs
  >;
};

export type TodoResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Todo"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["User"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
