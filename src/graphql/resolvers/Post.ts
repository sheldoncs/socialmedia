import { Post } from "../../endPoints/socialMedia/mongoModels/post";
import { verifyToken } from "../../util/authToken";
import { AuthenticationError } from "apollo-server-express";

export const getPosts = async () => {
  try {
    /*Sort in Ascending order*/
    const postIt = await Post.find().sort({ createdAt: -1 });
    return postIt;
  } catch (err) {
    throw new Error(err);
  }
};
export const getPost = async (root: any, args: { postId: string }) => {
  try {
    const post = await Post.findById({ _id: args.postId });
    return post;
  } catch (err) {
    throw new Error("Post not found");
  }
};
export const createPost = async (
  root: any,
  args: { body: string },
  context
) => {
  const newPost = new Post({
    body: args.body,
    user: context.user.id,
    username: context.user.username,
    createdAt: new Date().toISOString(),
  });

  const post = await newPost.save();

  return {
    id: context.user.id,
    body: args.body,
    createdAt: new Date().toISOString(),
    username: context.user.id,
  };
};
export const deletePost = async (
  root: any,
  args: { postId: string },
  context
) => {
  try {
    const post = await Post.findById({ _id: args.postId });

    const jsonPost = JSON.stringify(post);
    const parsePost = JSON.parse(jsonPost);

    if (post) {
      if (parsePost.username === context.user.username) {
        post.delete();
        return "Post successfully deleted";
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    } else {
      throw new Error("Post not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};
