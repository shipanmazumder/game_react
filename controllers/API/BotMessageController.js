const { json } = require("body-parser");
const { async } = require("crypto-random-string");
const nodeSchedule = require("node-schedule");
const axios = require("axios");
const Game = require("../../models/Game");

exports.webHookGet = (req, res, next) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe") {
      Game.findOne({ game_verify_token: token })
        .then((game) => {
          res.status(200).send(challenge);
        })
        .catch((err) => {
          res.sendStatus(403);
        });
    } else {
      res.sendStatus(403);
    }
  }
};
exports.webHookPost = (req, res, next) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.hasOwnProperty("game_play")) {
        let game_id = webhook_event.game_play.game_id;
        let user_id = webhook_event.game_play.player_id;
        Game.findOne({ app_id: game_id })
          .then((game) => {
            GameUser.findOne({ user_unique_id: user_id })
              .then((user) => {
                if (user) {
                  user.sender_id = sender_psid;
                  user.message_count = 0;
                  user.save();
                  startMessageShedule(game_id, user_id, sender_psid);
                }
              })
              .catch((error) => {});
          })
          .catch((error) => {
            res.sendStatus(505);
          });
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let startMessageShedule = async (game_id, user_id, sender_id) => {
  let nowTime = new Date(Date.now());
  let user = await GameUser.findOne({ user_unique_id: user_id });
  if(user.message_count<6){
    let game = await Game.findOne({ app_id: game_id });
    let messge = game.botMessages.find(
      (message) => message.position == user.message_count + 1
    );
    user.last_message_time = messge.messageTime * 36000 + nowTime;
    user.message_count=user.message_count+1
    user.save();
    let minute = messge.messageTime * 60;
    let job = nodeSchedule.scheduleJob(`*/${minute} * * * *`, function () {
      sendMessage(user, game, sender_id);
      startMessageShedule(game_id,user_id,sender_id)
      job.cancel();
    });
  }
};
let sendMessage = (user,game,sender_id) => {
  let attetchmentMessage = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: message.title,
            image_url: message.imageUrl,
            subtitle: message.subTitle,
            default_action: {
              type: "game_play",
            },
            buttons: [
              {
                type: "game_play",
                title: message.buttonTitle,
                playload: JSON.stringify(message.data),
              },
            ],
          },
        ],
      },
    },
  };
  let request_body={
    "recipient": {
      "id": sender_id
    },
    "message": attetchmentMessage
  }
  axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${game.game_access_token}`,request_body)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};
