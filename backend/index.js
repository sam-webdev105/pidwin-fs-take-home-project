import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import { userRouter, gameRouter } from "./src/api/index.js";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';

mongoose
  .connect(MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
