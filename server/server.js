import express from "express";
import cors from "cors";
import morgan from "morgan";

import connect from "./database/connection.js";
import dotenv from "dotenv";
dotenv.config();

import router from "./router/route.js";

const app = express();

/** Middleware */
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const port = process.env.PORT;

/** Http GET request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET request");
});

/** API Routes */
app.use("/api", router);

app.get("/hello", (req, res) => {
  res.json({
    msg: "Hello There!",
  });
});

/** Start Server only we have valid connection*/
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log("Error while connecting with the database. Exiting now...");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
