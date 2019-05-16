import { ON_SEARCH_TEXT_CHANGE, SET_SELECTED_PARISH, SET_GEO_SEARCH, CLEAR_SELECTED_PARISH } from "../types";

export const handleSearchTextChange = text => ({ type: ON_SEARCH_TEXT_CHANGE, payload: text });
export const setSelectedParish = parish => ({ type: SET_SELECTED_PARISH, payload: parish });
export const setGeoSearch = geo => ({ type: SET_GEO_SEARCH, payload: geo });
export const clearSelectedParish = () => ({ type: CLEAR_SELECTED_PARISH });
