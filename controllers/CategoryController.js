const mongoose = require("mongoose");
const Category = require("../models/Category");

exports.getCategory = (req, res, next) => {
  Category.find()
    .then((result) => {
      var data = {
        status: true,
        code: 200,
        message: ["All Categories"],
        data: result,
      };
      res.json(data);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postCategory = (req, res, next) => {
  Category.insertMany(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
