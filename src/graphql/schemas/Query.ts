import { gql } from "apollo-server-express";

export const Query = gql`
  type Query {
    getPosts: [Post!]
    getPost(postId: String): Post
    getLogin(username: String, password: String): User!
  }
`;
