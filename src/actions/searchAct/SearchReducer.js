import {
  ON_SEARCH_TEXT_CHANGE,
  SET_SELECTED_PARISH,
  ADD_RASTE_TO_QUERY,
  REMOVE_RASTE_FROM_QUERY,
  ADD_GUILD_STATUS_TO_QUERY,
  REMOVE_GUILD_STATUS_FROM_QUERY,
  SET_GEO_SEARCH,
  CLEAR_SELECTED_PARISH,
  INCREASE_QUERY_PAGE,
  SET_NEARBY_QUERY,
  SET_REACH_END_CENTERS,
  SET_SEARCH_SORT,
  CLEAR_QUERY_PAGE,
  CLEAR_SEARCH_SORT
} from "./SearchTypes";
import { CLEAN_CENTERS } from "../centers/CentersTypes";
import _ from "lodash";

let defaultState = {
  selectedParish: {},
  nearSearch: false,
  sortName: "",
  rastes: [],
  reachEnd: false,
  query: {
    text: "",
    geo: {},
    near: null,
    sort: null,
    rastes: [],
    page: 0,
    guildStatus: null
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ON_SEARCH_TEXT_CHANGE:
      return { ...state, query: { ...state.query, text: action.payload } };
    case INCREASE_QUERY_PAGE:
      return {
        ...state,
        query: { ...state.query, page: state.query.page + 1 }
      };
    case CLEAR_QUERY_PAGE:
      return { ...state, query: { ...state.query, page: 0 }, reachEnd: false };
    case CLEAN_CENTERS:
      return { ...state, query: { ...state.query, page: 0 }, reachEnd: false };
    case SET_REACH_END_CENTERS:
      return { ...state, reachEnd: true };
    case SET_GEO_SEARCH:
      return { ...state, query: { ...state.query, geo: action.payload } };
    case SET_SEARCH_SORT:
      return {
        ...state,
        query: { ...state.query, sort: action.payload.sort },
        sortName: action.payload.sortName
      };
    case CLEAR_SEARCH_SORT:
      return { ...state, query: { ...state.query, sort: null }, sortName: "" };
    case SET_SELECTED_PARISH:
      return {
        ...state,
        query: { ...state.query, geo: action.payload.polygon, near: null },
        nearSearch: false,
        selectedParish: action.payload
      };

    case ADD_RASTE_TO_QUERY:
      const findRaste = _.find(state.rastes, { _id: action.payload._id });
      let rastes = state.rastes;
      let rastesId = state.query.rastes;
      if (findRaste) {
        rastes = rastes.filter(raste => raste._id !== action.payload._id);
        rastesId = rastesId.filter(rasteId => rasteId !== action.payload._id);
      }
      return {
        ...state,
        rastes: [action.payload, ...rastes],
        query: { ...state.query, rastes: [action.payload._id, ...rastesId] }
      };
    case REMOVE_RASTE_FROM_QUERY:
      const removedRastes = state.rastes.filter(
        raste => raste._id !== action.payload._id
      );
      const removedRastesId = state.query.rastes.filter(
        rasteId => rasteId !== action.payload._id
      );
      return {
        ...state,
        rastes: removedRastes,
        query: { ...state.query, rastes: removedRastesId }
      };

    case ADD_GUILD_STATUS_TO_QUERY:
      return {
        ...state,
        query: { ...state.query, guildStatus: action.payload }
      };
    case REMOVE_GUILD_STATUS_FROM_QUERY:
      return { ...state, query: { ...state.query, guildStatus: null } };

    case CLEAR_SELECTED_PARISH:
      return {
        ...state,
        query: { ...state.query, geo: {} },
        selectedParish: {}
      };
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
