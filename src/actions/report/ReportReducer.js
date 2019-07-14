import {
  GET_REPORTS,
  REPORTS_LOAD,
  SELECTED_REPORT,
  GET_REPORTS_ERR,
  CLEAN_REPORTS,
  ADD_REPORT_LOAD,
  ADD_REPORT
} from "./ReportTypes";
import _ from "lodash";

let defaultState = {
  reports: [],
  selectedReport: {},
  getReportsLoading: false,
  getReportErr: "",
  addReportLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REPORTS_LOAD:
      return { ...state, getReportsLoading: true };
    case ADD_REPORT_LOAD:
      return { ...state, addReportLoading: true };
    case ADD_REPORT:
      return {
        ...state,
        addReportLoading: false,
        reports: [...state.reports, action.payload]
      };
    case GET_REPORTS:
      return {
        ...state,
        getReportsLoading: false,
        reports: action.payload,
        getReportErr: ""
      };
    case SELECTED_REPORT:
      return {
        ...state,
        getReportsLoading: false,
        selectedReport: action.payload
      };
    case GET_REPORTS_ERR:
      return {
        ...state,
        getReportErr:
          "مشکلی در دریافت گزارش ها به وجود آمده است لطفا دوباره تلاش کنید"
      };
    case CLEAN_REPORTS:
      return { ...state, reports: [] };
    default:
      return state;
  }
};
