import express from "express";

import { ratingController } from "../controllers/index.js";

const { createRating, getAllRatings, getRagingsByPlace } = ratingController;

const router = express.Router();

const ratingRoutes = {
  CREATE: "/rating/create",
  GET_ALL: "/rating",
  GET_BY_PLACE: "/rating/:id",
};

router.post(ratingRoutes.CREATE, createRating);
router.get(ratingRoutes.GET_ALL, getAllRatings);
router.get(ratingRoutes.GET_BY_PLACE, getRagingsByPlace);

export default router;
