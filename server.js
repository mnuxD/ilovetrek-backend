import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// config environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

// Connect to database
const dbConnection = process.env.DB_STRING_CONNECTION;
await mongoose.connect(dbConnection);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

// Express
const app = express();
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("ILOVETREK SERVER");
});

// app.use("/auth", userRouter);
// app.use("/api", listRouter);

const PORT = process.env.PORT || 5000;

// Launch server
app.listen(PORT, () => {
  console.log("Iniatialized ILOVETREK server!!");
});
