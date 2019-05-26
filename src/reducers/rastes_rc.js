import { GET_RASTES, RASTES_LOAD, SELECTED_RASTE, GET_RASTES_ERR, CLEAN_RASTES } from "../types";
import _ from "lodash";

let defaultState = { rastes: [], selectedRaste: {}, rastesLoading: false, getRastesErr: "" };

export default (state = defaultState, action) => {
  switch (action.type) {
    case RASTES_LOAD:
      return { ...state, rastesLoading: true };
    case GET_RASTES:
      return { ...state, rastesLoading: false, rastes: action.payload, getRastesErr: "" };
    case SELECTED_RASTE:
      return { ...state, selectedRaste: action.payload };
    case GET_RASTES_ERR:
      return { ...state, getRastesErr: "مشکلی در دریافت محله ها به وجود آمده است لطفا دوباره تلاش کنید" };
    case CLEAN_RASTES:
      return { ...state, getRastesErr: [] };
    default:
      return state;
  }
};
