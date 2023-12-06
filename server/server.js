import express from "express";
import cors from "cors";
import morgan from "morgan";

import connect from "./database/connection.js";

const app = express();

/** Middleware */

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const port = 8080;

/** Http GET request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET request");
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
