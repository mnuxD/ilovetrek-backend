import { placeServices } from "../services/index.js";

const { create, getAll, getOne } = placeServices;

export const createPlace = async (req, res) => {
  try {
    const newPlace = await create(req.body);
    console.log(newPlace);
    res.status(201).json(newPlace);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await getAll();
    if (places.length === 0) res.status(204).send();
    else res.status(200).json(places);
    console.log("places", places);
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
    console.log("place", place);
  } catch (error) {
    res.status(500).json({ error: e });
  }
};
