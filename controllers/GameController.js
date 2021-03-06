const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Game = require("../models/Game");
const { validationResult } = require("express-validator");
const {validationError} = require("../util/error");
const {response} = require("../util/responseFormat");

exports.getGame = (req, res, next) => {
  Game.find()
    .populate({ path: "categoryId", select: 'name' })
    .sort({name:1})
    .then((result) => {
      response(res, true, 200, "Game", result);
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postGame = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationError(res,errors)
  }
  req.body.categoryId = mongoose.Types.ObjectId(req.body.categoryId);
  req.body.game_unique_id = uuidv4();
  let game = new Game(req.body);
  game
    .save()
    .then((result) => {
       response(res, true, 200, "Game Add Successfull", result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.updateGame = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationError(res,errors)
  }
  req.body.categoryId = mongoose.Types.ObjectId(req.body.categoryId);
  
  Game.findOne(mongoose.Types.ObjectId(req.body._id))
    .then((game) => {
      game.name=req.body.name;
      game.game_access_token=req.body.game_access_token;
      game.game_short_code=req.body.game_short_code;
      game.game_verify_token=req.body.game_verify_token;
      game.categoryId=req.body.categoryId;
      game.description=req.body.description;
      game.app_secret=req.body.app_secret;
      game.app_id=req.body.app_id;
      return game.save();
    })
    .then((result)=>{
      response(res, true, 200, "Game Update Successfull", result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
