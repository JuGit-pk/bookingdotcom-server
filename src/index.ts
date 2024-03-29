import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
// MIDDLEWARES
app.use(express.json()); // to parse the body into the json
app.use(express.urlencoded({ extended: true })); // to parse the url encoded data i.e. forms %&
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  }),
); // for security to allow specific ports
app.use(cookieParser());
//
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen("7000", () => {
  console.log("server is running on localhose: 7000");
});
