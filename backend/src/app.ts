import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(error) {
      if (!error.originalError) return error;
      const message = error.message || "an error";

      return { message };
    },
  })
);

// TODO should hide mongodb URL
/* eslint-disable no-console */
mongoose
  .connect(
    "mongodb+srv://admin:adminadmin@constraintsolver-db.tw6br.mongodb.net/my_calendar?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Database connection successful...");
    console.log("Server is running...");
  })
  .catch((err) => console.log(err));
/* eslint-disable no-console */
