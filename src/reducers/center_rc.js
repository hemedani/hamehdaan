import {
  CLEAN_CENTER,
  GET_CENTER,
  GET_CENTER_ERR,
  CENTER_LOAD,
  SET_LOCATION_CENTER,
  SET_LOCATION_CENTER_LOAD,
  SET_LOCATION_CENTER_ERR,
  ADD_PIC_CENTER,
  ADD_PIC_CENTER_LOAD,
  UPDATE_PROTECTED_CENTER_LOAD,
  UPDATE_PROTECTED_CENTER,
  UPDATE_PROTECTED_CENTER_ERR,
  ADD_PIC_CENTER_ERR
} from "../types";

let defaultState = {
  centerLoading: false,
  updateProtectedLoading: false,
  picLoading: false,
  locationLoad: false,
  error: "",
  center: { pics: [] }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CENTER_LOAD:
      return { ...state, centerLoading: true, error: "" };
    case GET_CENTER_ERR:
      return { ...state, centerLoading: false, error: "مشکلی در دریافت صنف به وجود آمده است" };
    case GET_CENTER:
      return { ...state, centerLoading: false, center: action.payload, error: "" };
    case CLEAN_CENTER:
      return { ...state, centerLoading: false, center: defaultState.center, error: "" };

    case SET_LOCATION_CENTER_ERR:
      return { ...state, locationLoad: false, error: "مشکلی به وجود آمده لطفا دوباره تلاش کنید" };
    case SET_LOCATION_CENTER_LOAD:
      return { ...state, locationLoad: true, error: "" };
    case SET_LOCATION_CENTER:
      return {
        ...state,
        locationLoad: false,
        center: {
          ...state.center,
          location: action.payload.location,
          staticMap: action.payload.staticMap
        },
        error: ""
      };

    case ADD_PIC_CENTER_ERR:
      return { ...state, picLoading: false, error: "مشکلی به وجود آمده لطفا دوباره تلاش کنید" };
    case ADD_PIC_CENTER_LOAD:
      return { ...state, picLoading: true, error: "" };
    case ADD_PIC_CENTER:
      return {
        ...state,
        picLoading: false,
        center: {
          ...state.center,
          pics: action.payload.pics
        },
        error: ""
      };

    case UPDATE_PROTECTED_CENTER_ERR:
      return { ...state, picLoading: false, error: "مشکلی به وجود آمده لطفا دوباره تلاش کنید" };
    case UPDATE_PROTECTED_CENTER_LOAD:
      return { ...state, updateProtectedLoading: true, error: "" };
    case UPDATE_PROTECTED_CENTER:
      const {
        name,
        discount,
        description,
        telegram,
        instagram,
        email,
        website,

        guildId,
        issueDate,
        expirationDate,
        personType,
        activityType,
        isicCode,
        postalCode,

        guildOwnerName,
        guildOwnerFamily,
        identificationCode,
        nationalCode,
        ownerFatherName,
        ownerBirthDate,

        waterPlaque,
        registrationPlaque,

        membershipFeeDate
      } = action.payload;
      return {
        ...state,
        updateProtectedLoading: false,
        center: {
          ...state.center,
          name,
          discount,
          description,
          telegram,
          instagram,
          email,
          website,

          guildId,
          issueDate,
          expirationDate,
          personType,
          activityType,
          isicCode,
          postalCode,

          guildOwnerName,
          guildOwnerFamily,
          identificationCode,
          nationalCode,
          ownerFatherName,
          ownerBirthDate,

          waterPlaque,
          registrationPlaque,

          membershipFeeDate
        },
        error: ""
      };

    default:
      return state;
  }
};
