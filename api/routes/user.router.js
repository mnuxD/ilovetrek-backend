import express from "express";

import { userController } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const {
  register,
  getAllUsers,
  getAllRequests,
  getOneUser,
  updateUser1,
  updateUser2,
  palindrome,
} = userController;

const router = express.Router();

const userRoutes = {
  REGISTER: "/register",
  GET_ALL: "/users",
  GET_REQUESTS: "/users/requests",
  GET_ONE: "/user/:id",
  UPDATE_USER_1: "/user/update1/:id",
  UPDATE_USER_2: "/user/update2/:id",
  palindrome: "/palindrome",
};

router.post(userRoutes.REGISTER, register);
router.get(userRoutes.GET_ALL, validateToken, getAllUsers);
router.get(userRoutes.GET_REQUESTS, validateToken, getAllRequests);
router.get(userRoutes.GET_ONE, validateToken, getOneUser);
router.put(userRoutes.UPDATE_USER_1, validateToken, updateUser1);
router.put(userRoutes.UPDATE_USER_2, validateToken, updateUser2);
router.post(userRoutes.palindrome, palindrome);

export default router;
