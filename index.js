import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';    
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config({path: './config.env'});

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (err) {
      throw err;
    }
  };

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.use("/api/auth", authRoute);

app.listen(8000, () => {
    connect();
    console.log("Server is running on port 8000");
});
