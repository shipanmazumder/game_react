const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Game = require("../models/Game");
const { validationResult } = require("express-validator");
const {validationError} = require("../util/error");
const {response} = require("../util/responseFormat");

exports.getBotMessage = (req, res, next) => {
   let game_id=req.query.game_id;
  Game.findOne({_id:game_id})
    .then((result) => {
      response(res, true, 200, "Bot Messages", result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postBotMessage = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationError(res,errors)
  }
  let game_id=req.query.game_id;
  Game.findOne({_id:game_id})
    .then((result) => {
        if(!result){
            return response(res, false, 200, "No result found", result);
        }
        let newMessage={
            title:req.body.title,
            subtitle:req.body.subtitle,
            image_url:req.body.image_url,
            message_time:req.body.message_time,
            button_title:req.body.button_title,
            data:req.body.data,
            position:req.body.position,
            status:req.body.status
        };
        let updateMessages=result.botMessages;
        oldMessages.push(newMessage);
        result.botMessages=oldMessages
        result.save();
        response(res, true, 200, "Game", result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.updateBotMessage = (req, res, next) => {
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
