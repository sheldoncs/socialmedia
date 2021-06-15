import { User } from "../../endPoints/socialMedia/mongoModels/user";
import { UserInterface } from "../../interfaces/userInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongoConnect } from "../../config/mongo";
import { UserInputError } from "apollo-server-errors";
import { validateRegisterInput } from "../../util/validators";

export const register = async (root: any, payload: UserInterface) => {
  try {
    const load = JSON.stringify(payload);
    const obj = JSON.parse(load);

    const { errors, valid } = validateRegisterInput(
      obj.registerInput.username,
      obj.registerInput.email,
      obj.registerInput.password,
      obj.registerInput.confirmPassword
    );

    if (!valid) {
      throw new UserInputError("errors", {
        errors,
      });
    }
    const userInfo = await User.findOne({
      username: obj.registerInput.username,
    });

    if (userInfo) {
      const message = `User ${obj.registerInput.username} already exists`;
      throw new UserInputError(message, {
        errors: { username: "Username already taken" },
      });
    } else {
      let password = await bcrypt.hash(obj.registerInput.password, 12);
      const newUser = new User({
        email: obj.registerInput.email,
        username: obj.registerInput.username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      console.log("res._id", res._id);
      const token = jwt.sign(
        {
          email: obj.registerInput.email,
          password: obj.registerInput.password,
          username: obj.registerInput.username,
        },
        mongoConnect.SECRET_KEY,
        { expiresIn: "1h" }
      );

      const message = `User, ${obj.registerInput.username} created successfully`;
      return {
        id: res._id,
        email: obj.registerInput.email,
        token,
        username: obj.registerInput.username,
        createdAt: new Date().toISOString(),
      };
    }
  } catch (err) {
    throw new Error(err);
  }
};
