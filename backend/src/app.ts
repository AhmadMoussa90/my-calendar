import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

const app = express();

app.use(express.json());

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
    }
  })
);

// TODO should hide mongodb URL
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
