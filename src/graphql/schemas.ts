import { Query } from "./schemas/Query";
import { userMutation } from "./schemas/Mutation";
import { PostProfile } from "./schemas/posts/post";
import { RegisterProfile } from "./schemas/register/Register";
import { LoginProfile } from "./schemas/Login/login";
export const typeDefs = [
  Query,
  LoginProfile,
  PostProfile,
  RegisterProfile,
  userMutation,
];
