import {
  ON_SEARCH_TEXT_CHANGE,
  SET_SELECTED_PARISH,
  SET_GEO_SEARCH,
  CLEAR_SELECTED_PARISH,
  SET_NEARBY_QUERY,
  SET_SEARCH_SORT,
  CLEAR_SEARCH_SORT
} from "../types";

export const handleSearchTextChange = text => ({ type: ON_SEARCH_TEXT_CHANGE, payload: text });
export const setSelectedParish = parish => ({ type: SET_SELECTED_PARISH, payload: parish });
export const setGeoSearch = geo => ({ type: SET_GEO_SEARCH, payload: geo });
export const clearSelectedParish = () => ({ type: CLEAR_SELECTED_PARISH });
export const setNearByQuery = location => ({ type: SET_NEARBY_QUERY, payload: location });

export const setSortQuery = sort => ({ type: SET_SEARCH_SORT, payload: sort });
export const cleanSortQuery = () => ({ type: CLEAR_SEARCH_SORT });
