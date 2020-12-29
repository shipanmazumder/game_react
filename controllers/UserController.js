const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/Users");
const { validationError } = require("../util/error");
const { response } = require("../util/responseFormat");

const { validationResult } = require("express-validator");
var privateKey = fs.readFileSync("./jwtRS256.key");

exports.postUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  bcrypt
    .hash(req.body.password, 12)
    .then((hasPassword) => {
      req.body.password = hasPassword;
      let user = new Users(req.body);
      user
        .save()
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationError(res,errors)
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      return response(res,false,404,'Email/Password Invalid');
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          var token = jsonwebtoken.sign({ data: user }, privateKey, {
            // algorithm: "RS256",
            expiresIn: 60,
          });
          var data = {
            status: true,
            code: 200,
            token: `Bearer ${token}`,
            message: "Login Success",
            data: user,
          };
          return res.json(data);
        }
        response(res,false,404,'Email/Password Invalid');
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  })
  .catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};
