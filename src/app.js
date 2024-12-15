const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const postRoutes = require("../routes/postRoutes");
app.use("/posts", postRoutes);

module.exports = app;
