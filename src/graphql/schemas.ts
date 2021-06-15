import { Query } from "./schemas/Query";
import { userMutation } from "./schemas/Mutation";
import { PostProfile } from "./schemas/posts/post";
import { RegisterProfile } from "./schemas/register/Register";

export const typeDefs = [Query, PostProfile, RegisterProfile, userMutation];
