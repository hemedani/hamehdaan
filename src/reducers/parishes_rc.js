import { GET_PARISHES, PARISHES_LOAD, SELECTED_PATISH, GET_PARISHES_ERR, CLEAN_PARISHES } from "../types";
import _ from "lodash";

let defaultState = { parishes: [], selectedParish: {}, parishesLoading: false, getParishesErr: "" };

export default (state = defaultState, action) => {
  switch (action.type) {
    case PARISHES_LOAD:
      return { ...state, parishesLoading: true };
    case GET_PARISHES:
      return { ...state, parishesLoading: false, parishes: action.payload, getParishesErr: "" };
    case SELECTED_PATISH:
      return { ...state, selectedParish: action.payload };
    case GET_PARISHES_ERR:
      return { ...state, getParishesErr: "مشکلی در دریافت محله ها به وجود آمده است لطفا دوباره تلاش کنید" };
    case CLEAN_PARISHES:
      return { ...state, getParishesErr: [] };
    default:
      return state;
  }
};
