import mongoose from "mongoose";

// Schema ratings
const schemaRatings = {
  id_user: String,
  id_place: String,
  photo_url: String,
  rating: Number,
  comment: String,
  date: String,
};

// Rating model
const Rating = mongoose.model("Rating", schemaRatings, "rating");

export default Rating;
