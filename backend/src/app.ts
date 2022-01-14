import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

/* eslint-disable no-console */
mongoose
  .connect(
    "mongodb+srv://admin:adminadmin@constraintsolver-db.tw6br.mongodb.net/my_calendar?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful...");
    console.log("Server is running...");
  })
  .catch((err) => console.log(err));
/* eslint-disable no-console */
