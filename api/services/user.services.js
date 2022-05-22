import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const create = async (data) => {
  const { email, password, firstname, lastname } = data;
  const user_exist = await User.find({ email });

  // Email and password validations
  if (user_exist.length !== 0) {
    throw new Error();
  } else if (password.split("").length < 8) {
    throw new Error();
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ ...data, password: hash });
  const user = await newUser.save();
  return user;
};

export const getAll = async () => {
  const users = await User.find();
  return users;
};

export const getAllGuidesRequests = async () => {
  const usersSend = await User.find({ status: "Enviado" });
  const usersRejected = await User.find({ status: "Rechazado" });
  const usersApproved = await User.find({ status: "Aprobado" });

  const users = usersSend.concat(usersRejected).concat(usersApproved);
  return users;
};

export const getOne = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const update1 = async (user, data) => {
  if (data.password.split("").length < 8) {
    throw new Error();
  }
  const hash = await bcrypt.hash(data.password, 10);
  const userToUpdate = { ...data, password: hash };
  await User.updateOne(user, userToUpdate);
  return userToUpdate;
};

export const update2 = async (user, data) => {
  await User.updateOne(user, data);
  return data;
};
