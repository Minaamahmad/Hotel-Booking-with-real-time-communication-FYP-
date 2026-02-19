import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import hotelrouter from "./routes/HotelsRoute.js";
import roomrouter from "./routes/RoomsRoute.js";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import googlAuthrouter from "./Controllers/googleauth.js"
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const URI=process.env.MONGO_URI;
mongoose.connect(URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
app.use("/auth", googlAuthrouter)
app.use("/v1/hotels", hotelrouter);
app.use("/v1/rooms", roomrouter);