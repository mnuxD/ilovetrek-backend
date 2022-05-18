import express from "express";

import { userController } from "../controllers/index.js";

const { register, getAllUsers, getOneUser, updateUser1, updateUser2 } =
  userController;

const router = express.Router();

const userRoutes = {
  REGISTER: "/register",
  GET_ALL: "/users",
  GET_ONE: "/user/:id",
  UPDATE_USER_1: "/user/update1/:id",
  UPDATE_USER_2: "/user/update2/:id",
};

router.post(userRoutes.REGISTER, register);
router.get(userRoutes.GET_ALL, getAllUsers);
router.get(userRoutes.GET_ONE, getOneUser);
router.put(userRoutes.UPDATE_USER_1, updateUser1);
router.put(userRoutes.UPDATE_USER_2, updateUser2);

export default router;
