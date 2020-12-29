const { check } = require("express-validator");
const Game = require("../models/Game");
const Users = require("../models/Users");

exports.userValidate = [
  check("name").not().isEmpty().withMessage("Name Required"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return Users.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "E-Mail exists already, please pick a different one."
          );
        }
      });
    }),
  check("password").exists(),
  check(
    "passwordConfirmation",
    "passwordConfirmation field must have the same value as the password field"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
];
exports.loginValidate = [
  check("email").not().isEmpty().withMessage("Email Required").isEmail().withMessage("Please enter a valid email address."),
  check("password").not().isEmpty().withMessage("Password Required")
];
