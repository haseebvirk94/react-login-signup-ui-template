import * as actiontypes from "./actiontypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actiontypes.AUTH_START,
  };
};
const checkAuthTimeOut = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};
export const authSuccess = (token) => {
  return {
    type: actiontypes.AUTH_SUCCESS,
    token: token,
  };
};
export const authFail = (error) => {
  return {
    type: actiontypes.AUTH_FAIL,
    error: error,
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actiontypes.AUTH_FAIL,
  };
};
export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("url", {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem(("token", token));
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
export const authSignUp = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("url", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem(("token", token));
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeOut(expirationDate.getTime() - new Date().getTime()) /
            1000
        );
      }
    }
  };
};
