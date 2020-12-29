const { check } = require("express-validator");
const Game = require("../models/Game");

const gameValidate = [
  check("game_short_code")
    .not().isEmpty().withMessage("Game Short Code Required")
    .isLength({ min: 3 })
    .withMessage("The game short code must be at least 3 characters")
    .isLength({ max: 6 })
    .withMessage("The game short code may not be greater than 6 character")
    .custom((value, { req }) => {
      return Game.findOne({ game_short_code: value }).then((game) => {
        if (game) {
          return Promise.reject(
            "Game Short Code exists already, please pick a different one."
          );
        }
      });
    }),
  check("app_id")
    .not().isEmpty().withMessage("App ID Required")
    .isLength({ max: 20 })
    .withMessage("The app id may not be greater than 20 character")
    .custom((value, { req }) => {
      return Game.findOne({ app_id: value }).then((game) => {
        if (game) {
          return Promise.reject(
            "App id exists already, please pick a different one."
          );
        }
      });
    }),
  check("categoryId").not().isEmpty().withMessage("Category Required"),
  check("game_verify_token")
    .not()
    .isEmpty()
    .withMessage("Game Verify Token is Required."),
  check("game_access_token")
    .not()
    .isEmpty()
    .withMessage("Game Access Token is Required."),
  check("name").not().isEmpty().withMessage("Game Name is Required."),
  check("app_secret").not().isEmpty().withMessage("App Secret is Required."),
];
module.exports = gameValidate;
