import mongoose from "mongoose";

// Schema admin
const schemaAdmins = {
  email: String,
  password: String,
  firstname: { type: String, default: "Admin" },
  lastname: { type: String, default: "" },
  role: { type: String, default: "admin" },
  photo_url: { type: String, default: "" },
};

// Admin model
const Admin = mongoose.model("Admin", schemaAdmins, "admin");

export default Admin;
