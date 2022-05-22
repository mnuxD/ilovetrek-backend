import { Admin } from "../models/index.js";
import bcrypt from "bcrypt";

export const create = async (data) => {
  const { email, password } = data;
  const admin_exist = await Admin.find({ email });

  // Email and password validations
  if (admin_exist.length !== 0) {
    throw new Error();
  } else if (password.split("").length < 8) {
    throw new Error();
  }
  const hash = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ ...data, password: hash });
  const admin = await newAdmin.save();
  return admin;
};

export const getAll = async () => {
  const admins = await Admin.find();
  return admins;
};

export const getOne = async (id) => {
  const admin = await Admin.findById(id);
  return admin;
};
