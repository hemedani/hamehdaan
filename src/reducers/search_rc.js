import { ON_SEARCH_TEXT_CHANGE, SET_SELECTED_PARISH, SET_GEO_SEARCH, CLEAR_SELECTED_PARISH } from "../types";

let defaultState = {
  selectedParish: {},
  query: { text: "", geo: {} }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ON_SEARCH_TEXT_CHANGE:
      return { ...state, query: { ...state.query, text: action.payload } };
    case SET_GEO_SEARCH:
      return { ...state, query: { ...state.query, geo: action.payload } };
    case SET_SELECTED_PARISH:
      return { ...state, query: { ...state.query, geo: action.payload.polygon }, selectedParish: action.payload };
    case CLEAR_SELECTED_PARISH:
      return { ...state, query: { ...state.query, geo: {} }, selectedParish: {} };
    default:
      return state;
  }
};
