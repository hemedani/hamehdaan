import axios from "axios";
import _ from "lodash";
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
    let user = await getItem("user");
    user = JSON.stringify(user);
    if (_.includes(user.level, "organic.boss")) {
      query.etehadiye = user.bossEt;
    } else if (_.includes(user.level, "organic.officer")) {
      query.creator = user._id;
    }
    return axios
      .get(`${RU}/reports`, { headers: { sabti: token }, params: query })
      .then(resp => dispatch({ type: GET_REPORTS, payload: resp.data.reports }))
      .catch(e => dispatch({ type: GET_REPORTS_ERR, payload: e }));
  };
};
export const getReportById = _id => {
  return async dispatch => {
    dispatch({ type: REPORTS_LOAD });
    const token = await getItem("token");
    return axios
      .get(`${RU}/report`, { headers: { sabti: token }, params: { _id } })
      .then(resp => dispatch({ type: SELECTED_REPORT, payload: resp.data.report }))
      .catch(e => dispatch({ type: GET_REPORTS_ERR, payload: e }));
  };
};

export const addReport = report => {
  return async dispatch => {
    dispatch({ type: ADD_REPORT_LOAD });
    const token = await getItem("token");
    return axios
      .post(`${RU}/report/add`, report, { headers: { sabti: token } })
      .then(resp => dispatch({ type: ADD_REPORT, payload: resp.data.report }))
      .catch(e => dispatch({ type: GET_REPORTS_ERR, payload: e }));
  };
};

export const cleanReports = () => ({ type: CLEAN_REPORTS });
