import axios from "axios";
import { Alert } from "react-native";
import _ from "lodash";
import { GET_CENTERS, CENTERS_LOAD, GET_CENTERS_ERR, CLEAN_CENTERS, RU } from "../types";
import { getItem } from "./AsyncStorageAct";

export const getCenters = query => {
  return async dispatch => {
    dispatch({ type: CENTERS_LOAD });
    const token = await getItem("token");
    let user = await getItem("user");
    let isAccess = false;
    if (user) user = JSON.parse(user);
    if (_.includes(user.level, "tarah") || _.includes(user.level, "admin")) {
      isAccess = true;
    } else if (_.includes(user.level, "organic.officer")) {
      isAccess = true;
      query.etehadiye = user.officerEt;
    }
    if (isAccess) {
      return axios
        .get(`${RU}/protected/centers`, { headers: { sabti: token }, params: query })
        .then(resp => dispatch({ type: GET_CENTERS, payload: resp.data.centers }))
        .catch(e => dispatch({ type: GET_CENTERS_ERR, payload: e }));
    } else {
      // TODO Create a Navigation Web Service url(https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html) and navigate to Auth and sign out user and clear AsyncStorage ==================
      return dispatch({ type: CLEAN_CENTERS });
    }
  };
};

export const cleanCenters = () => ({ type: CLEAN_CENTERS });
