import axios from "axios";
import {
  GET_REPORTS,
  REPORTS_LOAD,
  SELECTED_REPORT,
  GET_REPORTS_ERR,
  CLEAN_REPORTS,
  ADD_REPORT_LOAD,
  ADD_REPORT,
  RU
} from "../types";
import { getItem } from "./AsyncStorageAct";

export const getReports = query => {
  return async dispatch => {
    dispatch({ type: REPORTS_LOAD });
    const token = await getItem("token");
    return axios
      .get(`${RU}/reports`, { headers: { sabti: token }, params: query })
      .then(resp => dispatch({ type: GET_REPORTS, payload: resp.data.reports }))
      .catch(e => dispatch({ type: GET_REPORTS_ERR, payload: e }));
  };
};

export const addReport = report => {
  return async dispatch => {
    dispatch({ type: ADD_REPORT_LOAD });
    const token = await getItem("token");
    return axios
      .post(`${RU}/report/add`, { report }, { headers: { sabti: token } })
      .then(resp => dispatch({ type: ADD_REPORT, payload: resp.data.report }))
      .catch(e => dispatch({ type: GET_REPORTS_ERR, payload: e }));
  };
};

export const cleanReports = () => ({ type: CLEAN_REPORTS });
