import axios from "axios";
import { GET_PARISHES, PARISHES_LOAD, SELECTED_PATISH, GET_PARISHES_ERR, CLEAN_PARISHES, RU } from "../types";
import { getItem } from "./AsyncStorageAct";

export const getParishes = query => {
  return async dispatch => {
    dispatch({ type: PARISHES_LOAD });
    const token = await getItem("token");
    return axios
      .get(`${RU}/parishes`, { headers: { sabti: token }, params: query })
      .then(resp => dispatch({ type: GET_PARISHES, payload: resp.data.parishes }))
      .catch(e => dispatch({ type: GET_PARISHES_ERR, payload: e }));
  };
};

export const cleanParishes = () => ({ type: CLEAN_PARISHES });
export const setSelectedParish = parish => ({ type: SELECTED_PATISH, payload: parish });
