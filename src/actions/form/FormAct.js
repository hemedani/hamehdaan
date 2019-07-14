import {
  SET_SELECTED_RASTE_FOR_ADD_CENTER,
  CLEAR_SELECTED_RASTE_FOR_ADD_CENTER,
  SET_SELECTED_PARISH_FOR_ADD_CENTER,
  CLEAR_SELECTED_PARISH_FOR_ADD_CENTER,
  SUBMIT_ADD_CENTER_FORM,
  CLEAR_ADD_CENTER_FORM
} from "./FormTypes";

export const setSelectedRasteForAddCenter = raste => ({ type: SET_SELECTED_RASTE_FOR_ADD_CENTER, payload: raste });
export const clearSelectedRasteForAddCenter = () => ({ type: CLEAR_SELECTED_RASTE_FOR_ADD_CENTER });

export const setSelectedParishForAddCenter = parish => ({ type: SET_SELECTED_PARISH_FOR_ADD_CENTER, payload: parish });
export const clearSelectedParishForAddCenter = () => ({ type: CLEAR_SELECTED_PARISH_FOR_ADD_CENTER });

export const submitAddCenterForm = () => ({ type: SUBMIT_ADD_CENTER_FORM });
export const clearAddCenterForm = () => ({ type: CLEAR_ADD_CENTER_FORM });
