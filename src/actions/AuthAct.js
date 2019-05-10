import axios from "axios";
import moment from "moment";
import {
  AUTH_USER,
  GET_OWN_USER_LOAD,
  GET_OWN_USER_FAIL,
  ACCEPT_PHONE,
  DECREASE_AUTH_TIMER,
  STOP_AUTH_TIMER,
  USER_LOAD,
  GET_OWN_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  UPDATE_USER,
  USER_PIC_LOAD,
  USER_SIGNIN_LOAD,
  CLEAN_CART,
  SET_AUTH_MSG,
  RU
} from "../types";

import { getToken, setItem, getItem, removeItem } from "./AsyncStorageAct";

export const phoneMsg = "لطفا شمــــاره تلفن همراه خود را وارد کنید";
export const codeMsg = "لطفا کد پیامک شده را وارد کنید";
export const invalidCode = "کد وارد شده صحیح نیست لطفا کد صحیح را وارد کنید";

export const setCacheUser = () => {
  return async dispatch => {
    const user = await getItem("user");
    if (user) {
      return dispatch({ type: GET_OWN_USER, payload: JSON.parse(user) });
    }
  };
};

export const signinUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_LOAD });
    return axios
      .post(`${RU}/login`, { email, password })
      .then(async resp => {
        await setItem("token", resp.data.token);
        await setItem("user", resp.data.user);
        return dispatch({ type: AUTH_USER, payload: resp.data });
      })
      .catch(e => {
        return dispatch(authError("مشکلی بوجود آمده است لطفا دوباره تلاش کنید"));
      });
  };
};

let authInterval = null;

export const handleAuthTimer = () => {
  return async dispatch => {
    let storeTimer = parseInt(await getItem("acceptCodeTimer")) || 0;
    if (storeTimer > 0) {
      await setItem("acceptCodeTimer", (storeTimer - 1).toString());
      return dispatch({ type: DECREASE_AUTH_TIMER, payload: storeTimer - 1 });
    } else {
      return dispatch(stopAuthTimer());
    }
  };
};

export const stopAuthTimer = () => {
  return async dispatch => {
    await removeItem("acceptCodeTimer");
    clearInterval(authInterval);
    dispatch({ type: SET_AUTH_MSG, payload: phoneMsg });
    return dispatch({ type: STOP_AUTH_TIMER });
  };
};

export const setAuthTimerLeft = timesLeft => {
  return async dispatch => {
    await setItem("acceptCodeTimer", timesLeft.toString());
    clearInterval(authInterval);
    dispatch({ type: SET_AUTH_MSG, payload: codeMsg });
    authInterval = setInterval(() => dispatch(handleAuthTimer()), 1000);
    return dispatch({ type: DECREASE_AUTH_TIMER, payload: timesLeft });
  };
};

export const coutDownAuthTimer = () => {
  return dispatch => {
    clearInterval(authInterval);
    dispatch({ type: SET_AUTH_MSG, payload: codeMsg });
    authInterval = setInterval(() => dispatch(handleAuthTimer()), 1000);
  };
};

export const signWithMob = usr => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_LOAD });
    return axios
      .post(`${RU}/login/withmob`, usr)
      .then(async resp => {
        if (process.env.NODE_ENV === "development") {
          console.log("====================================");
          console.log(resp.data);
          console.log("====================================");
        }
        clearInterval(authInterval);
        await setItem("acceptCodeTimer", "90");
        await setItem("AuthTimerDate", moment().toString());
        await setItem("user", JSON.stringify(resp.data.user));
        authInterval = setInterval(() => dispatch(handleAuthTimer()), 1000);
        dispatch({ type: SET_AUTH_MSG, payload: codeMsg });
        return dispatch({ type: ACCEPT_PHONE, payload: resp.data });
      })
      .catch(e => {
        return dispatch(authError("مشکلی بوجود آمده است لطفا دوباره تلاش کنید"));
      });
  };
};

export const sendCode = usr => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_LOAD });
    return axios
      .post(`${RU}/login/acceptkey`, usr)
      .then(async resp => {
        console.log("==================");
        console.log("resp from sendCode AuthAct", resp);
        console.log("==================");

        if (resp.data.user) {
          await setItem("user", JSON.stringify(resp.data.user));
          await setItem("token", resp.data.token);
          dispatch(stopAuthTimer());
          return dispatch({ type: AUTH_USER, payload: resp.data });
        } else {
          dispatch({ type: SET_AUTH_MSG, payload: invalidCode });
          return dispatch(authError("مشکلی بوجود آمده است لطفا دوباره تلاش کنید"));
        }
      })
      .catch(e => {
        return dispatch(authError("مشکلی بوجود آمده است لطفا دوباره تلاش کنید"));
      });
  };
};

export const editOwn = usr => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_LOAD });
    const token = getToken();
    return axios
      .post(`${RU}/user/editown`, usr, { headers: { sabti: token } })
      .then(resp => {
        setItem("user", resp.data.user);
        return dispatch({ type: GET_OWN_USER, payload: resp.data.user });
      })
      .catch(e => {
        return dispatch(authError("مشکلی بوجود آمده است لطفا دوباره تلاش کنید"));
      });
  };
};

export const register = ({ email, password, address, name, familyName, phone }) => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_LOAD });
    return axios
      .post(`${RU}/register`, { email, password, address, name, familyName, phone })
      .then(resp => {
        setItem("user", resp.data.user);
        setItem("token", resp.data.token);
        return dispatch({ type: AUTH_USER, payload: resp.data });
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error === "Email e has"
        ) {
          return dispatch(authError("این ایمیل در دسترس نیست لطفا ایمیل دیگری را امتحان کنید"));
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error === "Shomare e has"
        ) {
          return dispatch(authError("این شماره قبلا ثبت نام کرده است - لطفا شماره دیگری را امتحان کنید"));
        } else {
          return dispatch(authError("ثبت نام انجام نشد لطفا دوباره تلاش کنید"));
        }
      });
  };
};

export const authError = err => ({ type: AUTH_ERROR, payload: err });

export const singoutUser = () => {
  return async dispatch => {
    await removeItem("token");
    await removeItem("user");
    return dispatch({ type: UNAUTH_USER });
  };
};

export const changePic = ({ _id, file }) => {
  return dispatch => {
    const token = getToken();
    dispatch({ type: USER_PIC_LOAD });
    let data = new FormData();
    data.append("userId", _id);
    data.append("file", file);
    let config = {
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        // console.log( percentCompleted )
      },
      headers: { sabti: token }
    };
    return axios
      .put(`${RU}/upload`, data, config)
      .then(resp => {
        return dispatch({ type: UPDATE_USER, payload: resp.data });
      })
      .catch(error => {});
  };
};

export const getOwn = () => {
  return async dispatch => {
    dispatch({ type: GET_OWN_USER_LOAD });
    const token = await getToken();
    if (token) {
      return axios
        .get(`${RU}/user/getown`, { headers: { sabti: token } })
        .then(resp => dispatch({ type: GET_OWN_USER, payload: resp.data.user }))
        .catch(e => dispatch({ type: GET_OWN_USER_FAIL }));
    } else {
      return dispatch({ type: GET_OWN_USER_FAIL });
    }
  };
};
