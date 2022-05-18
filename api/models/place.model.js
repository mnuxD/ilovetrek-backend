import mongoose from "mongoose";

// Schema places
const schemaPlaces = {
  id_user: String,
  name: String,
  photos: Array,
  difficulty: String,
  capacity: Number,
  time: Array,
  city: String,
  time_city: String,
  rating: { type: String, default: "0" },
  comments: { type: Number, default: 0 },
  description: String,
  how_to_get: String,
  tips: String,
  verified: { type: Boolean, default: false },
  visits: { type: Array, default: [] },
};

// Place model
const Place = mongoose.model("Place", schemaPlaces, "place");

export default Place;
