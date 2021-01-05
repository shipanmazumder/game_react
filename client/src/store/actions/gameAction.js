import axios from "axios";
import { removeCookie } from "../../utils/auth";
import * as Types from "../actions/types";
import { API } from './../../config';
import { logout } from './authAction';

export const catgeories = (history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/categories`)
      .then((res) => {
          let result=res.data;
          if(result.code===200){
            dispatch({
                type:Types.LOAD_CATEGORIES,
                payload:{
                  categories:result.data
                }
            })
          }else{
            dispatch({
              type:Types.LOAD_CATEGORIES,
              payload:{
                categories:[],
                message:result.message
              }
            })
          }
      })
      .catch((errors) => {
        if(errors.response.status===401){
          logout(history);
        }
      });
  };
};
export const games = (history) => {
  return (dispatch) => {
    axios
      .get(`${API}/api/games`)
      .then((res) => {
          let result=res.data;
          if(result.code===200){
            dispatch({
                type:Types.LOAD_GAMES,
                payload:{
                  games:result.data
                }
            })
          }else{
            dispatch({
              type:Types.LOAD_GAMES,
              payload:{
                games:[]
              }
            })
          }
      })
      .catch((errors) => {
        if(errors.response.status===401){
          removeCookie("token");
          dispatch({
            type: Types.SET_USER,
            payload: {
              isAuth:false,
              user: {},
            }
          })
        }
      });
  };
};
export const gameAdd = (game, history) => {
  return (dispatch) => {
    axios
      .post(`${API}/api/game-add`, game)
      .then((res) => {
        dispatch({
          type: Types.SET_GAMES,
          payload: {
            games:res.data.data,
            message:"Game Add Success"
          },
        });
        return res;
      })
      .then((res)=>{
        history.push("/game");
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.GAME_ERRORS,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
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
            game:res.data.data,
            message:"Game Update Success"
          },
        });
        return res;
      })
      .then((res)=>{
        history.push("/game");
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.GAME_ERRORS,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
      });
  };
};
