import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import user from "./routes/user.js";
import DBconnect from "./config/DBconnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

DBconnect("mongodb://localhost:27017");

app.use("/", user);

app.listen(5000, () => {
  console.log("Be started at port 5000");
});
