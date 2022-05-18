import { ratingServices } from "../services/index.js";

const { create, getRatingByPlace, getAll } = ratingServices;

export const createRating = async (req, res) => {
  try {
    const newRating = await create(req.body);
    console.log(newRating);
    res.status(201).json(newRating);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await getAll();
    console.log(ratings);
    res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export const getRagingsByPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await getRatingByPlace(id);
    if (ratings.length === 0) res.status(204).send();
    else res.status(200).json(ratings);
    console.log("RATINGS", ratings);
  } catch (error) {
    res.status(500).json({ error: e });
  }
};
