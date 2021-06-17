import { User } from "../../endPoints/socialMedia/mongoModels/user";
import { UserInterface } from "../../interfaces/userInterface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongoConnect } from "../../config/mongo";
import { UserInputError } from "apollo-server-errors";
import { validateRegisterInput } from "../../util/validators";
import { validateLogin } from "../../util/validators";
import { verifyToken } from "../../util/authToken";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      password: user.password,
      username: user.username,
    },
    mongoConnect.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export const login = async (root: any, payload: UserInterface, context) => {
  const { errors, valid } = validateLogin(payload.username, payload.password);
  console.log("login");
  if (!valid) {
    throw new UserInputError("Invalid Login", {
      errors,
    });
  }
  const userInfo = await User.findOne({ username: payload.username });
  let info = JSON.stringify(userInfo);
  let parseInfo = JSON.parse(info);

  if (!userInfo) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }
  const match = await bcrypt.compare(payload.password, parseInfo.password);

  if (!match) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }
  const token = generateToken(parseInfo);
  return {
    id: parseInfo._id,
    email: parseInfo.email,
    token,
    username: parseInfo.username,
    createdAt: new Date().toISOString(),
  };
};

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
      throw new UserInputError("registration errors", {
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
      let info = JSON.stringify(res);
      let parseInfo = JSON.parse(info);
      const token = generateToken(parseInfo);

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
