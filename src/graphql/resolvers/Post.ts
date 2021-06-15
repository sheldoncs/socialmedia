import { Post } from "../../endPoints/socialMedia/mongoModels/post";

export const getPosts = async () => {
  try {
    const postIt = await Post.find();
    return postIt;
  } catch (err) {
    throw new Error(err);
  }
};
