import express from "express";

import { adminController } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const { register, getAllAdmins, getOneAdmin } = adminController;

const router = express.Router();

const adminRoutes = {
  REGISTER: "/admin/register",
  GET_ALL: "/admin",
  GET_ONE: "/admin/:id",
};

router.post(adminRoutes.REGISTER, register);
router.get(adminRoutes.GET_ALL, validateToken, getAllAdmins);
router.get(adminRoutes.GET_ONE, validateToken, getOneAdmin);

export default router;
