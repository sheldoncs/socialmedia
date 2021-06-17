import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schemas";
import cors from "cors";
import compression from "compression";
import { gql } from "apollo-server-express";
import mongoose from "mongoose";
import { mongoConnect } from "./config/mongo";
import { verifyToken } from "./util/authToken";
import { AuthenticationError } from "apollo-server-express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
var router = express.Router();

app.use(express.static(__dirname + "/public"));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // context: verifyToken,
  context: verifyToken,
  introspection: true,
  debug: false,
});
apolloServer.applyMiddleware({ app, path: "/graphql" });
const port = process.env.PORT || 3000;
mongoose
  .connect(mongoConnect.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MONGODB successfully.");
    return app.listen({ port });
  })
  .then(() => {
    console.log(
      `\nGraphQL and chat Server running on ---> http://localhost:${port}/graphql\n`
    );
  });
