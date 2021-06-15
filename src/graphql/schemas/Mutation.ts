import { gql } from "apollo-server-express";

export const userMutation = gql`
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
