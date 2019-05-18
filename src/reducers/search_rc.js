import {
  ON_SEARCH_TEXT_CHANGE,
  SET_SELECTED_PARISH,
  SET_GEO_SEARCH,
  CLEAR_SELECTED_PARISH,
  SET_NEARBY_QUERY,
  SET_SEARCH_SORT,
  CLEAR_SEARCH_SORT
} from "../types";

let defaultState = {
  selectedParish: {},
  nearSearch: false,
  sortName: "",
  query: { text: "", geo: {}, near: null, sort: null }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ON_SEARCH_TEXT_CHANGE:
      return { ...state, query: { ...state.query, text: action.payload } };
    case SET_GEO_SEARCH:
      return { ...state, query: { ...state.query, geo: action.payload } };
    case SET_SEARCH_SORT:
      return { ...state, query: { ...state.query, sort: action.payload.sort }, sortName: action.payload.sortName };
    case CLEAR_SEARCH_SORT:
      return { ...state, query: { ...state.query, sort: null }, sortName: "" };
    case SET_SELECTED_PARISH:
      return {
        ...state,
        query: { ...state.query, geo: action.payload.polygon, near: null },
        nearSearch: false,
        selectedParish: action.payload
      };
    case CLEAR_SELECTED_PARISH:
      return { ...state, query: { ...state.query, geo: {} }, selectedParish: {} };
    case SET_NEARBY_QUERY:
      return {
        ...state,
        query: { ...state.query, geo: {}, near: action.payload },
        selectedParish: {},
        nearSearch: action.payload ? true : false
      };
    default:
      return state;
  }
};
