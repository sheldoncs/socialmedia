import { gql } from "apollo-server-express";

export const PostProfile = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
`;
