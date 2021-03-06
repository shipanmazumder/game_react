const { json } = require("body-parser");
const { async } = require("crypto-random-string");
const nodeSchedule = require("node-schedule");
const axios = require("axios");
const request = require("request");
const Game = require("../../models/Game");
const GameUser = require("../../models/GameUser");

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
            if(!game){
             return res.sendStatus(404);
            }
            GameUser.findOne({ user_unique_id: user_id })
              .then((user) => {
                console.log(user)
                if (user) {
                  user.sender_id = sender_psid;
                  user.message_count = 0;
                  user.save().then((result)=>{
                    startMessageShedule(game_id, user_id, sender_psid);
                    if(user.job_schedule_id!=""){
                      try {
                        var old_job = nodeSchedule.scheduledJobs[`botMessage_${user_id}`];
                        old_job.cancel(); 
                      } catch (error) {
                      }
                    }
                    return res.status(200).send("EVENT_RECEIVED");
                  }).catch((err)=>{
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error)
                  });
                }else{
                  let newUser=new GameUser({
                    sender_id:sender_psid,
                    message_count:0,
                    user_unique_id:user_id,
                    game_id:game._id,
                    firends:[],
                    leaderBoard:{
                      score:0,
                      user_game_level:0,
                      user_xp:0,
                      last_update_time:new Date(Date.now())
                    }
                  })
                  newUser.save().then((result)=>{
                    startMessageShedule(game_id, user_id, sender_psid);
                    res.status(200).send("EVENT_RECEIVED");
                  }).catch((err)=>{
                    const error = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error)
                  });
                }
              })
              .catch((err) => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
              });
          })
          .catch((error) => {
            res.sendStatus(500);
          });
      }
    });
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let startMessageShedule = async (game_id, user_id, sender_id) => {
  console.log(game_id)
  let nowTime = new Date(Date.now());
  let user = await GameUser.findOne({ user_unique_id: user_id });
  if(user.message_count<6){
    let game = await Game.findOne({ app_id: game_id });
    let message = game.botMessages.find(
      (message) => message.position == (user.message_count + 1)
    );
    user.last_message_time = nowTime;
    user.job_schedule_id = `botMessage_${user_id}`;
    user.message_count=user.message_count+1
    user.save();
    let minute = message.messageTime * 60;
    let job = nodeSchedule.scheduleJob(`botMessage_${user_id}`,`*/${minute} * * * *`, function () {
      sendMessage(message,user, game, sender_id);
      startMessageShedule(game_id,user_id,sender_id)
      job.cancel();
    });
  }
};
let sendMessage = (message,user,game,sender_id) => {
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
                "payload": JSON.stringify({
                  "bot_data": 0
              })
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
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": game.game_access_token },
    "method": "POST",
    "json": request_body
}, (err, res, body) => {
    if (!err) {
      console.log(body);
        console.log('message sent!  Id: ' + sender_id)
    } else {
        console.error("Unable to send message:" + err);
    }
});
  // axios.post(`https://graph.facebook.com/v9.0/me/messages?access_token=${game.game_access_token}`,request_body)
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};
