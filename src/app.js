const express = require("express");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const postRoutes = require("../routes/postRoutes");
app.use("/posts", postRoutes);

module.exports = app;
