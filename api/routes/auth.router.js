import express from "express";

import { authController } from "../controllers/index.js";

const { login, loginAdmin } = authController;

const router = express.Router();

const authRoutes = {
  LOGIN: "/login",
  LOGIN_ADMIN: "/admin/login",
};

router.post(authRoutes.LOGIN, login);
router.post(authRoutes.LOGIN_ADMIN, loginAdmin);

export default router;
