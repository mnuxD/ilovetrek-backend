import { Place } from "../models/index.js";

export const create = async (data) => {
  const newPlace = new Place(data);
  console.log(newPlace);
  const place = await newPlace.save();
  return place;
};

export const getAll = async () => {
  const places = await Place.find();
  return places;
};

export const getOne = async (id) => {
  const place = await Place.findById(id);
  return place;
};
