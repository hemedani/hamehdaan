import axios from "axios";
import { GET_CENTERS, CENTERS_LOAD, GET_CENTERS_ERR, CLEAN_CENTERS, RU } from "../types";

export const getCenters = query => {
  return dispatch => {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .get(`${RU}/centers`, { params: query })
      .then(resp => dispatch({ type: GET_CENTERS, payload: resp.data.centers }))
      .catch(e => dispatch({ type: GET_CENTERS_ERR, payload: e }));
  };
};

export const cleanCenters = () => ({ type: CLEAN_CENTERS });
