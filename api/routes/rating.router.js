import express from "express";

import { ratingController } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const { createRating, getAllRatings, getRagingsByPlace, deleteRating } =
  ratingController;

const router = express.Router();

const ratingRoutes = {
  CREATE: "/rating/create",
  GET_ALL: "/rating",
  GET_BY_PLACE: "/rating/:id",
  DELETE: "/rating/delete/:id",
};

router.post(ratingRoutes.CREATE, validateToken, createRating);
router.get(ratingRoutes.GET_ALL, validateToken, getAllRatings);
router.get(ratingRoutes.GET_BY_PLACE, validateToken, getRagingsByPlace);
router.delete(ratingRoutes.DELETE, validateToken, deleteRating);

export default router;
