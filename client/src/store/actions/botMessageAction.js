import axios from "axios";
import { removeCookie } from "../../utils/auth";
import * as Types from "../actions/types";
import { API } from "./../../config";

export const getBotMessage = (history,game_id) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/bot-messages?game_id=${game_id}`)
      .then((res) => {
        let result = res.data;
        if (result.code === 200) {
          dispatch({
            type: Types.LOAD_BOT_MESSAGE,
            payload: {
              botMessages: result.data.botMessages,
            },
          });
        } else {
          dispatch({
            type: Types.LOAD_BOT_MESSAGE,
            payload: {
              botMessages: [],
              message: result.message,
            },
          });
        }
      })
      .catch((errors) => {
        try {
          if (errors.response.status === 401) {
            removeCookie("token");
            dispatch({
              type: Types.SET_USER,
              payload: {
                isAuth: false,
                user: {},
              },
            });
          }
        } catch (error) {}
      });
  };
};
export const botMessageAdd = (botMessage,game_id, history) => {
  return (dispatch) => {
    axios
      .post(`${API}/api/add-bot-message?game_id=${game_id}`, botMessage)
      .then((res) => {
        dispatch({
          type: Types.ADD_BOT_MESSAGE,
          payload: {
            botMessage: res.data.data.botMessages,
            message: "Bot Message Add Success",
          },
        });
        return res;
      })
      .then((res) => {
        history.push("/botMessage");
      })
      .catch((errors) => {
        try {
          if (errors.response.status === 422) {
            dispatch({
              type: Types.BOT_MESSAGE_ERRORS,
              payload: {
                errors: errors.response.data.errors,
              },
            });
          } else {
          }
        } catch (error) {}
      });
  };
};
export const gameUpdate = (game, history) => {
  return (dispatch) => {
    axios
      .post(`${API}/api/update-game`, game)
      .then((res) => {
        dispatch({
          type: Types.UPDATE_GAME,
          payload: {
            game: res.data.data,
            message: "Game Update Success",
          },
        });
        return res;
      })
      .then((res) => {
        history.push("/game");
      })
      .catch((errors) => {
        console.log(errors);
        try {
          if (errors.response.status === 422) {
            dispatch({
              type: Types.GAME_ERRORS,
              payload: {
                errors: errors.response.data.errors,
              },
            });
          } else {
          }
        } catch (error) {}
      });
  };
};
