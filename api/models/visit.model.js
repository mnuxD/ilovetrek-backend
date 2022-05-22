import mongoose from "mongoose";

//NOT USED

// Schema visits
const schemaVisits = {
  id_user: String,
  id_place: String,
  date: String,
  people: Number,
};

// User model
const Visit = mongoose.model("Visit", schemaVisits, "visit");

export default Visit;
