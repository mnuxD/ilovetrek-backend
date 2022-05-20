import { Place } from "../models/index.js";

export const create = async (data) => {
  const newPlace = new Place(data);
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

export const changeVerified = async (id) => {
  const place = await Place.findById(id).lean();
  const newPlace = { ...place, verified: !place.verified };
  console.log(newPlace);
  await Place.updateOne(place, newPlace);
  return newPlace;
};

export const updatePlace = async (place, data) => {
  await Place.updateOne(place, data);
  return data;
};

export const deleteOnePlace = async (id) => {
  const placeToDelete = await Place.findById(id);
  if (placeToDelete) {
    const deletedPlace = await Place.deleteOne(placeToDelete);
    return deletedPlace;
  } else return false;
};
