import {
  AUTH_USER,
  ACCEPT_PHONE,
  DECREASE_AUTH_TIMER,
  STOP_AUTH_TIMER,
  USER_LOAD,
  UNAUTH_USER,
  AUTH_ERROR,
  USER_SIGNIN_LOAD,
  UPDATE_USER_ADDRESS,
  GET_OWN_USER,
  GET_OWN_USER_LOAD,
  SET_AUTH_MSG,
  GET_OWN_USER_FAIL
} from "../types/index";

import { phoneMsg } from "../actions/AuthAct";

let authDef = {
  error: "",
  authenticated: false,
  loading: false,
  getOwnLoading: false,
  level: "normal",
  user: { _id: "", name: "", pic: "", email: "", address: [] },
  regLoading: false,
  loginLoading: false,
  authTimer: 0,
  authMsg: phoneMsg
};
export default (state = authDef, action) => {
  switch (action.type) {
    case ACCEPT_PHONE:
      return {
        ...state,
        error: "",
        authenticated: false,
        loading: false,
        user: { ...state.user, ...action.payload.user },
        loginLoading: false,
        authTimer: 90
      };
    case AUTH_USER:
      return {
        ...state,
        error: "",
        authenticated: true,
        loading: false,
        user: { ...state.user, ...action.payload.user },
        loginLoading: false,
        getOwnLoading: false,
        authTimer: 0
      };
    case UPDATE_USER_ADDRESS:
      return { ...state, user: { ...state.user, ...action.payload } };
    case SET_AUTH_MSG:
      return { ...state, authMsg: action.payload };
    case GET_OWN_USER_LOAD:
      return { ...state, getOwnLoading: true };
    case GET_OWN_USER_FAIL:
      return { ...state, getOwnLoading: false, error: "can not get your information" };
    case DECREASE_AUTH_TIMER:
      return { ...state, authTimer: action.payload };
    case STOP_AUTH_TIMER:
      return { ...state, authTimer: 0 };

    case GET_OWN_USER:
      return { ...state, loginLoading: false, loading: false, user: { ...state.user, ...action.payload } };

    case USER_LOAD:
      return { ...state, error: "", loading: true };
    case USER_SIGNIN_LOAD:
      return { ...state, error: "", loginLoading: true };
    case UNAUTH_USER:
      return authDef;
    case AUTH_ERROR:
      return { ...state, error: action.payload, loading: false, loginLoading: false };
    default:
      return state;
  }
};
