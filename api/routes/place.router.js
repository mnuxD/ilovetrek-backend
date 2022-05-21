import express from "express";

import { placeController } from "../controllers/index.js";
import { validateToken } from "../middlewares/index.js";

const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  changeVerifiedPlace,
  updateOnePlace,
  deletePlace,
} = placeController;

const router = express.Router();

const placeRoutes = {
  CREATE: "/place/create",
  GET_ALL: "/place",
  GET_ONE: "/place/:id",
  CHANGE_VERIFIED: "/place/verified/:id",
  UPDATE_PLACE: "/place/update/:id",
  DELETE_PLACE: "/place/delete/:id",
};

router.post(placeRoutes.CREATE, validateToken, createPlace);
router.get(placeRoutes.GET_ALL, getAllPlaces);
router.get(placeRoutes.GET_ONE, validateToken, getPlaceById);
router.put(placeRoutes.CHANGE_VERIFIED, validateToken, changeVerifiedPlace);
router.put(placeRoutes.UPDATE_PLACE, validateToken, updateOnePlace);
router.delete(placeRoutes.DELETE_PLACE, validateToken, deletePlace);

export default router;
