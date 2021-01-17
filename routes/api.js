const express = require('express')
const GameController = require('../controllers/GameController')
const CategoryController = require('../controllers/CategoryController')
const GameUserController = require('../controllers/GameUserController')
const gameValidator = require('../validator/gameValidator')
const UserController = require('../controllers/UserController')
const userValidator = require('../validator/userValidator')
const botMessageValidator = require('../validator/botMessageValidator')
const isAuth = require('../middleware/isAuth')
const { getBotMessage, postBotMessage } = require('../controllers/BotMessageController')
const { webHookGet } = require('../controllers/API/BotMessageController')

const route=express.Router();

route.get("/",isAuth,GameController.getGame);
route.get("/games",isAuth,GameController.getGame);
route.post("/game-add",isAuth,gameValidator,GameController.postGame);
route.post("/update-game",isAuth,gameValidator,GameController.updateGame);
route.post("/category-add",isAuth,CategoryController.postCategory);
route.get("/categories",isAuth,CategoryController.getCategory);

route.get("/bot-messages",isAuth,getBotMessage);
route.post("/add-bot-message",isAuth,botMessageValidator,postBotMessage);

route.post("/game-user-add",GameUserController.postGameUser);

route.post("/user-add",userValidator.userValidate,UserController.postUser);
route.post("/login",userValidator.loginValidate,UserController.postLogin);

route.get("/webhook",webHookGet);

module.exports=route;