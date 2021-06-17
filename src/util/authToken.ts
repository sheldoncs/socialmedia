import { AuthenticationError } from "apollo-server-express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async ({ req }) => {
  const { authorization } = req.headers;

  if (authorization !== undefined) {
    const token = authorization.split("Bearer ")[1];

    if (token) {
      const vToken = jwt.verify(
        token,
        process.env.jwtSecret,
        (err, decodedToken) => {
          // console.log(decodedToken);
          if (err) {
            throw new AuthenticationError("Invalid/Expired Token");
          } else {
            return { auth: true, user: decodedToken };
          }
        }
      );
      return vToken;
    }
  }
};
