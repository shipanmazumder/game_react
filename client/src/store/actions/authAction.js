import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Types from "../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import { API } from './../../config';
import { removeCookie, setCookie } from './../../utils/auth';

export const register = (user, history) => {
  return (dispatch) => {
    axios
      .post(`${API}/api/users/register`, user)
      .then((res) => {
        dispatch({
          type: Types.USER_ERROR,
          payload: {
            errors: [],
          },
        });
        history.push("/login");
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
      });
  };
};
export const login = (user, history) => {
  return (dispatch) => {
    axios
      .post(`${API}/api/login`, user)
      .then((res) => {
          let result=res.data;
          if(result.code===200){
            setCookie("token",result.token);
            // localStorage.setItem("auth_token",result.token);
            setAuthToken(result.token)
            dispatch({
                type:Types.SET_USER,
                payload:{
                    isAuth:true,
                    user:jwtDecode(result.token).data
                }
            })
            // history.push(`/dashboard`);
          }else{
            dispatch({
              type:Types.SET_MESSAGE,
              payload:{
                message:result.message
              }
            })
          }
      })
      .then(()=>{
        history.goBack();
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
            dispatch({
                type: Types.USER_ERROR,
                payload: {
                  errors: errors.response.data.errors,
                },
              });
        } else {
        }
      });
  };
};
export const logout = history => {
  removeCookie("token");
  history.push('/login')
  return {
      type: Types.SET_USER,
      payload: {
      isAuth:false,
      user: {},
    },
  }
}