import axios from "axios";
import { GET_CENTERS, CENTERS_LOAD, GET_CENTERS_ERR, CLEAN_CENTERS, RU } from "../types";
import { getItem } from "./AsyncStorageAct";

export const getCenters = query => {
  return async dispatch => {
    dispatch({ type: CENTERS_LOAD });
    const token = await getItem("token");
    return axios
      .get(`${RU}/protected/centers`, { headers: { sabti: token }, params: query })
      .then(resp => dispatch({ type: GET_CENTERS, payload: resp.data.centers }))
      .catch(e => dispatch({ type: GET_CENTERS_ERR, payload: e }));
  };
};

export const cleanCenters = () => ({ type: CLEAN_CENTERS });
