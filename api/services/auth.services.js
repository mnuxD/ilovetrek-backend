import { User } from "../models/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validPass = (password, passCript) => {
  return bcrypt.compare(password, passCript);
};

const getToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY);
};

export const logIn = async ({ email, password }) => {
  const user = await User.find({ email });
  if (user.length === 0) throw new Error();
  const userDB = user[0];
  const token = getToken(userDB.email);

  return (await validPass(password, userDB.password))
    ? { token, ...userDB._doc }
    : false;
};
