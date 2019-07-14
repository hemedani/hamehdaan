import {
  SET_SELECTED_RASTE_FOR_ADD_CENTER,
  CLEAR_SELECTED_RASTE_FOR_ADD_CENTER,
  SET_SELECTED_PARISH_FOR_ADD_CENTER,
  CLEAR_SELECTED_PARISH_FOR_ADD_CENTER,
  SUBMIT_ADD_CENTER_FORM,
  ERR_FOR_SELECTED_RASTE_IN_ADD_CENTER,
  ERR_FOR_SELECTED_PARISH_IN_ADD_CENTER,
  CLEAR_ADD_CENTER_FORM
} from "./FormTypes";
import _ from "lodash";
import { immutableSplice } from "../../utils/Imutable";

const defaultAddCenterForm = {
  selectedRaste: null,
  selectedParish: null,
  errors: {
    notAnyErr: false,
    msg: []
  }
};
const defaultState = {
  addCenterForm: defaultAddCenterForm
};

// TODO must clear errors when set parish or raste ==================
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_RASTE_FOR_ADD_CENTER:
      const indexRasteErr = state.addCenterForm.errors.msg.indexOf(
        ERR_FOR_SELECTED_RASTE_IN_ADD_CENTER
      );
      const newMsgWithoutRasteErr = immutableSplice(
        state.addCenterForm.errors.msg,
        indexRasteErr,
        1
      );
      return {
        ...state,
        addCenterForm: {
          ...state.addCenterForm,
          selectedRaste: action.payload,
          errors: { ...state.addCenterForm.errors, msg: newMsgWithoutRasteErr }
        }
      };
    case CLEAR_SELECTED_RASTE_FOR_ADD_CENTER:
      return {
        ...state,
        addCenterForm: {
          ...state.addCenterForm,
          selectedRaste: null
        }
      };

    case SET_SELECTED_PARISH_FOR_ADD_CENTER:
      const indexParishErr = state.addCenterForm.errors.msg.indexOf(
        ERR_FOR_SELECTED_PARISH_IN_ADD_CENTER
      );
      const newMsgWithoutParishErr = immutableSplice(
        state.addCenterForm.errors.msg,
        indexParishErr,
        1
      );
      return {
        ...state,
        addCenterForm: {
          ...state.addCenterForm,
          selectedParish: action.payload,
          errors: { ...state.addCenterForm.errors, msg: newMsgWithoutParishErr }
        }
      };
    case CLEAR_SELECTED_PARISH_FOR_ADD_CENTER:
      return {
        ...state,
        addCenterForm: { ...state.addCenterForm, selectedParish: null }
      };

    case CLEAR_ADD_CENTER_FORM: {
      return { ...state, addCenterForm: defaultAddCenterForm };
    }

    case SUBMIT_ADD_CENTER_FORM:
      let msg = [];
      let notAnyErr = false;
      if (state.addCenterForm.selectedParish === null)
        msg.push(ERR_FOR_SELECTED_PARISH_IN_ADD_CENTER);
      if (state.addCenterForm.selectedRaste === null)
        msg.push(ERR_FOR_SELECTED_RASTE_IN_ADD_CENTER);
      if (msg.length < 1) notAnyErr = true;
      return {
        ...state,
        addCenterForm: { ...state.addCenterForm, errors: { notAnyErr, msg } }
      };
    default:
      return state;
  }
};
