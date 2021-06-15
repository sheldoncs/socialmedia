import { dataCollection } from "./resolvers/index";

const getPosts = dataCollection.getPosts;
const register = dataCollection.register;
export const resolvers = { Query: { getPosts }, Mutation: { register } };
