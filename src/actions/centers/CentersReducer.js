import {
  GET_CENTERS,
  GET_CENTERS_ERR,
  REMOVE_CENTER,
  CENTERS_LOAD,
  CLEAN_CENTERS,
  GET_CENTERS_COUNT_LOAD,
  GET_CENTERS_COUNT,
  GET_CENTERS_COUNT_ERR,
  CENTER_PIC_LOAD,
  CENTER_PIC_LOAD_DONE,
  CENTER_ADD_PIC,
  PIC_UPLOAD_PERCENT,
  CLEAN_PIC_UPLOAD_PERCENT,
  PICS_UPLOADED,
  CENTER_UPDATE,
  SET_CENTER_TO_POPUP,
  SET_POPUP_TO_NULL,
  ADD_CENTER,
  ADD_CENTER_ERR,
  ADD_CENTER_LOAD,
  SET_REACH_END_CENTERS
} from "./CentersTypes";
import _ from "lodash";
import { immutableSplice } from "../../utils/Imutable";

let defaultState = {
  centerLoading: false,
  addCenterLoad: false,
  picLoading: false,
  error: "",
  centers: [],
  formPic: { _id: null, name: null },
  reachEnd: false,
  picUpPercent: [],
  picsUploaded: [],
  popup: null,
  countLoading: false,
  centersCount: null,
  errors: { countErr: null, addErr: "" }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CENTERS_LOAD:
      return { ...state, centerLoading: true };
    case GET_CENTERS_ERR:
      return {
        ...state,
        centerLoading: false,
        error: "مشکلی در دریافت مراکز به وجود آمده است"
      };
    case GET_CENTERS:
      let end = false;
      if (action.payload.length < 29) {
        end = true;
      }
      return {
        ...state,
        centerLoading: false,
        centers: [...state.centers, ...action.payload],
        reachEnd: end
      };
    case CLEAN_CENTERS:
      return { ...state, centerLoading: false, centers: [], reachEnd: false };
    case GET_CENTERS_COUNT_LOAD:
      return { ...state, countLoading: true };
    case GET_CENTERS_COUNT:
      return { ...state, countLoading: false, centersCount: action.payload };
    case GET_CENTERS_COUNT_ERR:
      return {
        ...state,
        countLoading: false,
        errors: {
          ...state.errors,
          countErr: "مشکلی در دریافت تعداد مراکز به وجود آمده است"
        }
      };

    case SET_REACH_END_CENTERS:
      return { ...state, reachEnd: true };

    case CENTER_PIC_LOAD:
      return { ...state, picLoading: true, formPic: { _id: null, name: null } };
    case CENTER_PIC_LOAD_DONE:
      return { ...state, picLoading: false };
    case CENTER_ADD_PIC:
      return { ...state, picLoading: false, formPic: action.payload };
    case SET_CENTER_TO_POPUP:
      return { ...state, popup: action.payload };
    case SET_POPUP_TO_NULL:
      return { ...state, popup: null };

    case ADD_CENTER_LOAD:
      return {
        ...state,
        addCenterLoad: true,
        errors: { ...state.errors, addErr: "" }
      };
    case ADD_CENTER:
      return {
        ...state,
        addCenterLoad: false,
        centers: [action.payload, ...state.centers],
        errors: { ...state.errors, addErr: "" }
      };
    case ADD_CENTER_ERR:
      return {
        ...state,
        addCenterLoad: false,
        errors: {
          ...state.errors,
          addErr:
            "مشکلی در اضافه کردن صنف به وجود آمده است لطفا دوباره تلاش کنید"
        }
      };

    case REMOVE_CENTER:
      let centers = state.centers.filter(
        center => center._id !== action.payload
      );
      return { ...state, centerLoading: false, centers: centers };
    case CENTER_UPDATE:
      let index = _.findIndex(state.centers, { _id: action.payload._id });
      const imutcenters = immutableSplice(
        state.centers,
        index,
        1,
        action.payload
      );
      return {
        ...state,
        centerLoading: false,
        picLoading: false,
        centers: imutcenters
      };
    case PIC_UPLOAD_PERCENT:
      const iI = _.findIndex(state.picUpPercent, { i: action.payload.i });
      const imutPercent = immutableSplice(
        state.picUpPercent,
        iI,
        1,
        action.payload
      );
      return { ...state, picUpPercent: imutPercent };
    case CLEAN_PIC_UPLOAD_PERCENT:
      return { ...state, picUpPercent: [], picsUploaded: [] };
    case PICS_UPLOADED:
      return {
        ...state,
        picsUploaded: [
          ...state.picsUploaded,
          { _id: action.payload._id, name: action.payload.name }
        ]
      };
    default:
      return state;
  }
};
