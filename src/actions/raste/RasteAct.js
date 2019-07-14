import axios from "axios";
import {
  GET_RASTES,
  RASTES_LOAD,
  GET_RASTES_ERR,
  CLEAN_RASTES
} from "./RasteTypes";
import { RU } from "../RootTypes";
import { getItem } from "../utils/AsyncStorageAct";

export const getRastes = query => {
  return async dispatch => {
    dispatch({ type: RASTES_LOAD });
    const token = await getItem("token");
    return axios
      .get(`${RU}/rastes`, { headers: { sabti: token }, params: query })
      .then(resp => dispatch({ type: GET_RASTES, payload: resp.data.rastes }))
      .catch(e => dispatch({ type: GET_RASTES_ERR, payload: e }));
  };
};

export const cleanRastes = () => ({ type: CLEAN_RASTES });
