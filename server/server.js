import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { UserRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/auth', UserRouter);

const connectionSring = process.env.DB_URI;

async function connect() {
  try {
    await mongoose.connect(connectionSring, {
      autoIndex: true,
    });
    console.log("DATABASE CONNECTION SUCCESSFUL");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port");
});
