const Game = require("../models/Game");
const GameUser = require("../models/GameUser");
const { response } = require("../util/responseFormat");

exports.globalLeaderBoard = (req, res, next) => {
  let game_id = req.query.game_id;
  let user_unique_id = req.query.user_unique_id;
  Game.findOne({ app_id: game_id })
    .then((game) => {
      if (!game) {
        return {
          game: null,
        };
      }
      return GameUser.find({ game_id: game._id })
        .sort({ "leaderBoard.total_coin": -1, last_update_time: 1 })
        .limit(20)
        .then((users) => {
          let sortUsers = users.map((user, index) => {
            return {
              position: index + 1,
              name: user.name,
              coin: user.leaderBoard.total_coin,
            };
          });
          return { leaderBoard: sortUsers, game: game };
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .then((info) => {
      if (!info.game) {
        return {
          game: null,
        };
      }
      return GameUser.find({ game_id: info.game._id })
        .sort({ "leaderBoard.total_coin": -1, last_update_time: 1 })
        .then((users) => {
          let userIndex = users.findIndex((user) => {
            return (
              JSON.stringify(user_unique_id) ===
              JSON.stringify(user.user_unique_id)
            );
          });
          if (userIndex >= 0) {
            let myPosition = userIndex + 1;
            let myFullInfo = users[userIndex];
            let someValue = {
              position: myPosition,
              name: myFullInfo.name,
              coin: myFullInfo.leaderBoard.total_coin,
            };

            return {
              leaderBoard: info.leaderBoard,
              game: info.game,
              myInfo: someValue,
            };
          } else {
            return {
              leaderBoard: info.leaderBoard,
              game: info.game,
              myInfo: null,
            };
          }
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .then((info) => {
      if (!info.game) {
        return res.status(200).json({
          status: false,
          code: 404,
          message: "No game found",
          data: null,
        });
      }
      GameUser.findOne({ user_unique_id: user_unique_id })
        .populate({ path: "friends.game_user_id" })
        .exec((err, user) => {
          if (err) {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          }
          if(!user){
            return res.status(200).json({
                status: false,
                code: 404,
                message: "No user found",
                data: null,
              });
          }
          if (user.friends.length > 0) {
            let leaderBoard = user.friends.reduce(function (filtered, option) {
              let someValue = {
                user_unique_id: option.game_user_id.user_unique_id,
                name: option.game_user_id.name,
                coin: option.game_user_id.leaderBoard.total_coin,
              };
              filtered.push(someValue);
              return filtered;
            }, []);
            let myInfo = {
              user_unique_id: user_unique_id,
              name: user.name,
              coin: user.leaderBoard.total_coin,
            };
            leaderBoard.push(myInfo);
            leaderBoard.sort(function (a, b) {
              return b.coin - a.coin;
            });
            let leaderBoardMap = leaderBoard.map((user, index) => {
              return {
                user_unique_id: user.user_unique_id,
                position: index + 1,
                name: user.name,
                coin: user.coin,
              };
            });
            const playerIndex = leaderBoardMap.findIndex(
              (user) => user.user_unique_id === user_unique_id
            );
            let myFullInfo = null;
            if (playerIndex >= 0) {
              myFullInfo = leaderBoardMap[playerIndex];
            }
            let data = {
              globalLeaderBoard: {
                leaderBoard: info.leaderBoard,
                myInfo: info.myInfo,
              },
              friendsLeaderBoard: {
                leaderBoard: leaderBoardMap,
                myInfo: myFullInfo,
              },
            };
            response(res, true, 200, "Leaderboards", data);
          }else{
            let data = {
                globalLeaderBoard: {
                  leaderBoard: info.leaderBoard,
                  myInfo: info.myInfo,
                },
                friendsLeaderBoard:null,
              };
              response(res, true, 200, "Leaderboards", data);
          }
        });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
