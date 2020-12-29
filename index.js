const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const apiRoute = require("./routes/api");

//setup express app
const app = express();

const MONGO_CONFIG = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize())
require('./passport')(passport)
//initialize routes
app.use("/api/",apiRoute);
//error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  var data = {
    status: false,
    code: 500,
    message: ["Internal Server Error"],
    data: null,
  };
  res.status(500).send(data);
});
mongoose
  .connect(process.env.MONGODBURI, MONGO_CONFIG)
  .then((result) => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => console.log(err));
