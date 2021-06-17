import { getPosts, getPost, createPost, deletePost } from "./Post";
import { register, login } from "./User";
export const dataCollection = {
  getPosts,
  register,
  login,
  getPost,
  createPost,
  deletePost,
};
