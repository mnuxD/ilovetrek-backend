import { User, Rating, Place } from "../models/index.js";

export const create = async (data) => {
  const date = new Date(Date.now());
  const initialRating = { ...data, date: date.toLocaleDateString() };
  const newRating = new Rating(initialRating);
  const rating = await newRating.save();
  const place = await Place.findById(data.id_place).lean();
  const newRatingValue = (
    (parseFloat(place.rating) * place.comments + data.rating) /
    (place.comments + 1)
  ).toFixed(1);
  const newCommentsValue = place.comments + 1;
  const newPlace = {
    rating: newRatingValue.toString(),
    comments: newCommentsValue,
  };
  await Place.updateOne(place, newPlace);
  return rating;
};

export const getAll = async () => {
  const ratings = await Rating.find();
  return ratings;
};

export const getRatingByPlace = async (id_place) => {
  let arrayRatings = [];
  const ratings = await Rating.find({ id_place });
  for (let i = 0; i < ratings.length; i++) {
    const user = await User.findById(ratings[i].id_user);
    if (user) {
      const newRating = {
        ...ratings[i]._doc,
        photo_user: user.photo_url,
        name_user: `${user.firstname.split(" ")[0]} ${
          user.lastname.split(" ")[0]
        }`,
      };
      arrayRatings.push(newRating);
    }
  }
  return arrayRatings;
};

export const deleteOneRating = async (id) => {
  const ratingToDelete = await Rating.findById(id);
  ////
  const place = await Place.findById(ratingToDelete.id_place).lean();
  const newRatingValue = (
    (parseFloat(place.rating) * place.comments -
      parseFloat(ratingToDelete.rating)) /
    (place.comments - 1)
  ).toFixed(1);
  const newCommentsValue = place.comments - 1;
  const newPlace = {
    rating: newRatingValue.toString(),
    comments: newCommentsValue,
  };
  await Place.updateOne(place, newPlace);
  /////
  if (ratingToDelete) {
    const deletedRating = await Rating.deleteOne(ratingToDelete);
    return deletedRating;
  } else return false;
};
