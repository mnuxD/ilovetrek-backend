import express from "express";

import { ratingController } from "../controllers/index.js";

const { createRating, getAllRatings, getRagingsByPlace, deleteRating } =
  ratingController;

const router = express.Router();

const ratingRoutes = {
  CREATE: "/rating/create",
  GET_ALL: "/rating",
  GET_BY_PLACE: "/rating/:id",
  DELETE: "/rating/delete/:id",
};

router.post(ratingRoutes.CREATE, createRating);
router.get(ratingRoutes.GET_ALL, getAllRatings);
router.get(ratingRoutes.GET_BY_PLACE, getRagingsByPlace);
router.delete(ratingRoutes.DELETE, deleteRating);

export default router;
