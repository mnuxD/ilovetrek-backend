import mongoose from "mongoose";

// Schema users
const schemaUsers = {
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  role: { type: String, default: "user" },
  photo_url: { type: String, default: "" },
  status: { type: String, default: "none" }, //none, send, rejected, approved
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  other1: { type: String, default: "" },
  other2: { type: String, default: "" },
  other3: { type: String, default: "" },
  about_you: { type: String, default: "" },
  recent: { type: Array, default: [] },
};

// User model
const User = mongoose.model("User", schemaUsers, "user");

export default User;
