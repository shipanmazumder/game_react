import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import * as Types from "./store/actions/types";
import { BrowserRouter } from "react-router-dom";
import { getCookie } from "./utils/auth";
const token = getCookie("token");
if (token) {
  let decode = jwtDecode(token);
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      isAuth: true,
      user: decode.data,
    },
  });
  setAuthToken(token);
}else{
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      isAuth: false,
      user: {},
    },
  });
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
