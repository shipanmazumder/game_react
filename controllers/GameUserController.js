const Game = require("../models/Game");
const GameUser = require("../models/GameUser");

exports.postGameUser = (req, res, next) => {
  const app_id = req.body.app_id;
  Game.findOne({ app_id: app_id })
    .then((game) => {
      if (!game) {
        return res.status(404).json({
          status: false,
          code: 404,
          message: ["No Game Found"],
          data: null,
        });
      }
      GameUser.findOne({ user_unique_id: req.body.user_unique_id })
        .then((user) => {
          if (user) {
            user.image = req.body.image_url;
            user.leaderBoard.score =
              req.body.score > user.leaderBoard.score
                ? req.body.score
                : user.leaderBoard.score;
            user.leaderBoard.game_level =
              req.body.game_level > user.leaderBoard.game_level
                ? req.body.game_level
                : user.leaderBoard.game_level;
            user.leaderBoard.last_update_time = new Date();
            user
              .save()
              .then((gameUserSave) => {
                res.json(gameUserSave);
              })
              .catch((err) => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
              });
          } else {
            const gameUsersObj = {
              game_id: game._id,
              image: req.body.image_url,
              name: req.body.name,
              user_unique_id: req.body.user_unique_id,
              leaderBoard: {
                score: req.body.score,
                game_level: req.body.game_level,
                last_update_time: new Date(),
              },
              last_login_time: new Date(),
            };
            const gameUser = new GameUser(gameUsersObj);
            gameUser
              .save()
              .then((gameUserSave) => {
                res.json(gameUserSave);
              })
              .catch((err) => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
              });
          }
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
