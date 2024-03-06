/* eslint-disable no-unused-vars */
const { PORT, MONGODB_URI } = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRoutes = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const usersRoutes = require("./controllers/users");

const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRoutes);
app.use("api/users", usersRoutes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;


