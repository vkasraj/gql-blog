import { todos, todo } from "./../app/todo/todo.resolvers";
import { me } from "../app/user/user.resolvers";

export const Query = { me, todos, todo };
