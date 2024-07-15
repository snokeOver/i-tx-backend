import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import allRoutes from "./routes/allRoutes.js";

// Initialize dotenv access
dotenv.config();
const mongoDBUrl = process.env.MONGO_URL;
const port = process.env.SERVER_PORT || 3000;
const allowedUrls = process.env.PERMITTED_URLS.split(",");

// Initialize app
const app = express();

// Connect MongoDB via Mongoose
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .catch((err) => {
    console.log("DB Connection Failed", err.message);
  });

// Primary middlewares
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

//   Define base file for all routes
app.use("/api", allRoutes);

app.listen(port, () => {
  console.log(`i-Tx is listening on port ${port}`);
});
