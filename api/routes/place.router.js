import express from "express";

import { placeController } from "../controllers/index.js";

const { createPlace, getAllPlaces, getPlaceById } = placeController;

const router = express.Router();

const placeRoutes = {
  CREATE: "/place/create",
  GET_ALL: "/place",
  GET_ONE: "/place/:id",
};

router.post(placeRoutes.CREATE, createPlace);
router.get(placeRoutes.GET_ALL, getAllPlaces);
router.get(placeRoutes.GET_ONE, getPlaceById);

export default router;
