import Place from "../models/place.model.js";
import { placeServices } from "../services/index.js";

const { create, getAll, getOne, changeVerified, updatePlace, deleteOnePlace } =
  placeServices;

export const createPlace = async (req, res) => {
  try {
    const newPlace = await create(req.body);
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).send();
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await getAll();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ error: e });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await getOne(id);
    if (!place) res.status(204).send();
    else res.status(200).json(place);
  } catch (error) {
    res.status(500).send();
  }
};

export const changeVerifiedPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const placeUpdated = await changeVerified(id);
    res.status(200).json(placeUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateOnePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await getOne(id);
    if (!place) throw new Error();
    const placeUpdated = await updatePlace(place, req.body);
    if (!placeUpdated) throw new Error();
    else res.status(200).json(placeUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlace = await deleteOnePlace(id);
    if (!deletedPlace) res.status(204).json({ error: "No place to delete" });
    else res.status(200).json(deletedPlace);
  } catch (error) {
    res.status(500).json({ error });
  }
};
