const Game = require("../models/Game");
const GameUser = require("../models/GameUser");

exports.postGameUser = async (req, res, next) => {
  const app_id = req.body.app_id;
  Game.findOne({ app_id: app_id })
    .then((game) => {
      if (!game) {
        return res.status(404).json({
          status: false,
          code: 404,
          message: "No Game Found",
          data: null,
        });
      }
      GameUser.findOne({ user_unique_id: req.body.user_unique_id, game_id: game._id })
        .then(async (user) => {
          let friendsMap = [];
          let friends=req.body.friends;
          if (friends.length > 0) {
            for (var i = 0; i < friends.length; i++) {
              let fbFriend = await GameUser.findOne({ user_unique_id: friends[i] });
              if (fbFriend) {
                friendsMap.push({
                  game_user_id: fbFriend._id
                });
              }
            }
          }
          if (user) {
            user.name = req.body.name;
            user.friends =friendsMap;
            user.image = req.body.image_url;
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
              friends: friendsMap,
              user_unique_id: req.body.user_unique_id,
              leaderBoard: {
                score:0,
                total_coin: 0,
                game_level: 0,
                last_week_total_coin: 0,
                last_update_time:Date.now(),
              },
              last_login_time: Date.now(),
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
          console.log(err)
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
