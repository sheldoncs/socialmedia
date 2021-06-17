import { dataCollection } from "./resolvers/index";

const getPosts = dataCollection.getPosts;
const register = dataCollection.register;
const getLogin = dataCollection.login;
const getPost = dataCollection.getPost;
const createPost = dataCollection.createPost;
const deletePost = dataCollection.deletePost;
export const resolvers = {
  Query: { getPosts, getPost, getLogin },
  Mutation: { register, createPost, deletePost },
};
