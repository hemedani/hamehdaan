import axios from "axios";
import _ from "lodash";
import {
  GET_CENTERS,
  CENTERS_LOAD,
  GET_CENTERS_ERR,
  CLEAN_CENTERS,
  SET_REACH_END_CENTERS,
  SET_SELECTED_CENTER,
  GET_SELECTED_CENTER,
  GET_SELECTED_CENTER_ERR,
  GET_SELECTED_CENTER_LOAD,
  ADD_CENTER,
  ADD_CENTER_ERR,
  ADD_CENTER_LOAD
} from "./CentersTypes";
import { RU } from "../RootTypes";
import { getItem } from "../utils/AsyncStorageAct";

export const getCenters = query => {
  return async dispatch => {
    dispatch({ type: CENTERS_LOAD });
    const token = await getItem("token");
    let user = await getItem("user");
    let isAccess = false;
    if (user) user = JSON.parse(user);
    if (_.includes(user.level, "tarah") || _.includes(user.level, "admin")) {
      isAccess = true;
    } else if (_.includes(user.level, "organic.officerEt")) {
      isAccess = true;
      query.etehadiye = user.etOrganization;
    }
    if (isAccess) {
      return axios
        .get(`${RU}/protected/centers`, {
          headers: { sabti: token },
          params: query
        })
        .then(resp => {
          if (resp.data.centers.length < 30) {
            dispatch({ type: SET_REACH_END_CENTERS });
          }
          return dispatch({ type: GET_CENTERS, payload: resp.data.centers });
        })
        .catch(err => dispatch({ type: GET_CENTERS_ERR, payload: err }));
    } else {
      // TODO Create a Navigation Web Service url(https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html) and navigate to Auth and sign out user and clear AsyncStorage ==================
      return dispatch({ type: CLEAN_CENTERS });
    }
  };
};

export const addCenter = center => {
  return async dispatch => {
    dispatch({ type: ADD_CENTER_LOAD });
    const token = await getItem("token");
    return axios
      .post(`${RU}/add/center/by/officer`, center, {
        headers: { sabti: token }
      })
      .then(resp => {
        console.log("==================");
        console.log("resp.data", resp.data);
        console.log("==================");

        dispatch({ type: ADD_CENTER, payload: resp.data.center });
      })
      .catch(err => dispatch({ type: ADD_CENTER_ERR, payload: err }));
  };
};

export const cleanCenters = () => ({ type: CLEAN_CENTERS });
