import { User, Rating, Place } from "../models/index.js";

export const create = async (data) => {
  const date = new Date(Date.now());
  const initialRating = { ...data, date: date.toLocaleDateString() };
  const newRating = new Rating(initialRating);
  const rating = await newRating.save();
  const place = await Place.findById(data.id_place).lean();
  const newRatingValue =
    (parseFloat(place.rating) * place.comments + data.rating) /
    (place.comments + 1);
  const newCommentsValue = place.comments + 1;
  const newPlace = {
    rating: newRatingValue.toString(),
    comments: newCommentsValue,
  };
  console.log("UPDATE", newPlace, place);
  await Place.updateOne(place, newPlace);
  return rating;
};

export const getAll = async () => {
  const ratings = await Rating.find();
  console.log(ratings);
  return ratings;
};

export const getRatingByPlace = async (id_place) => {
  let arrayRatings = [];
  const ratings = await Rating.find({ id_place });
  console.log(ratings);
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
  // console.log("DASDAS", arrayRatings);
  return arrayRatings;
};

export const deleteOneRating = async (id) => {
  const ratingToDelete = await Rating.findById(id);
  if (ratingToDelete) {
    const deletedRating = await Rating.deleteOne(ratingToDelete);
    return deletedRating;
  } else return false;
};
