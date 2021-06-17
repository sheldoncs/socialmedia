import { gql } from "apollo-server-express";

export const LoginProfile = gql`
  type Login {
    id: ID!
    username: String!
    password: String!
  }
`;
