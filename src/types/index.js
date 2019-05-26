const localPath = "http://localhost:1367/api";
const serverPath = "http://37.120.146.71:1367/api";
/* Address remote */
// export const RU = serverPath;
export const RU = process.env.NODE_ENV === "development" ? localPath : serverPath;

export const API_KEY = "AIzaSyDHrAOj672WWAVKh9bHho2Cbh5obIaNgOE";
export const DIRECTION_API_KEY = "AIzaSyCWN8u9CsZDhHZIh_r6quHh5C3pFrRFVXY";

export const AUTH_USER = "AUTH_USER";
export const USER_LOAD = "USER_LOAD";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const USER_PIC_LOAD = "USER_PIC_LOAD";
export const REMOVE_USER = "REMOVE_USER";
export const USER_SIGNIN_LOAD = "USER_SIGNIN_LOAD";
export const SET_AUTH_MSG = "SET_AUTH_MSG";

export const GET_USERS = "GET_USERS";
export const GET_USERS_ERR = "GET_USERS_ERR";
export const REGISTER_USER = "REGISTER_USER";
export const CLEAN_USERS = "CLEAN_USERS";
export const GET_USERS_LOAD = "GET_USERS_LOAD";
export const UPDATE_USER = "UPDATE_USER";
export const USER_UPDATE_LOAD = "USER_UPDATE_LOAD";
export const UPDATE_USER_ERR = "UPDATE_USER_ERR";
export const ADD_USER = "ADD_USER";
export const ADD_USER_LOAD = "ADD_USER_LOAD";
export const ADD_USER_ERR = "ADD_USER_ERR";

export const GET_USERS_COUNT_LOAD = "GET_USERS_COUNT_LOAD";
export const GET_USERS_COUNT = "GET_USERS_COUNT";
export const GET_USERS_COUNT_ERR = "GET_USERS_COUNT_ERR";

export const ACCEPT_PHONE = "ACCEPT_PHONE";
export const DECREASE_AUTH_TIMER = "DECREASE_AUTH_TIMER";
export const STOP_AUTH_TIMER = "STOP_AUTH_TIMER";

export const DOCTOR_SET_LOAD = "DOCTOR_SET_LOAD";
export const DOCTOR_SET = "DOCTOR_SET";
export const DOCTOR_SET_ERR = "DOCTOR_SET_ERR";

export const OWNER_SET_LOAD = "OWNER_SET_LOAD";
export const OWNER_SET = "OWNER_SET";
export const OWNER_SET_ERR = "OWNER_SET_ERR";

export const GET_OWN_USER_LOAD = "GET_OWN_USER_LOAD";
export const GET_OWN_USER_FAIL = "GET_OWN_USER_FAIL";
export const GET_OWN_USER = "GET_OWN_USER";

export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";
export const ADD_ADDRESS_TO_USER_LOAD = "ADD_ADDRESS_TO_USER_LOAD";
export const REMOVE_USER_ADDRESS_LOAD = "REMOVE_USER_ADDRESS_LOAD";

export const SHOW_ADD_ADDRESS_MODAL = "SHOW_ADD_ADDRESS_MODAL";
export const HIDE_ADD_ADDRESS_MODAL = "HIDE_ADD_ADDRESS_MODAL";

/************  --CITIES--  *************/
export const GET_CITIES = "GET_CITIES";
export const ADD_CITY = "ADD_CITY";
export const REMOVE_CITY = "REMOVE_CITY";
export const CITY_LOAD = "CITY_LOAD";
export const YOUR_CITY = "YOUR_CITY";
export const CLEAN_CITY = "CLEAN_CITY";
export const ADD_CITY_ERR = "ADD_CITY_ERR";
export const SET_CITY_COORDS = "SET_CITY_COORDS";

/************  --PARISHES--  *************/
export const GET_PARISHES = "GET_PARISHES";
export const PARISHES_LOAD = "PARISHES_LOAD";
export const SELECTED_PATISH = "SELECTED_PATISH";
export const CLEAN_PARISHES = "CLEAN_PARISHES";
export const GET_PARISHES_ERR = "GET_PARISHES_ERR";

/************  --RASTES--  *************/
export const GET_RASTES = "GET_RASTES";
export const RASTES_LOAD = "RASTES_LOAD";
export const SELECTED_RASTE = "SELECTED_RASTE";
export const CLEAN_RASTES = "CLEAN_RASTES";
export const GET_RASTES_ERR = "GET_RASTES_ERR";

/************  --CENTER--  *************/
export const GET_CENTER = "GET_CENTER";
export const GET_CENTER_ERR = "GET_CENTER_ERR";
export const CENTER_LOAD = "CENTER_LOAD";
export const SET_EXPERT_RATE_LOADING = "SET_EXPERT_RATE_LOADING";
export const SET_EXPERT_RATE_SET = "SET_EXPERT_RATE_SET";
export const SET_EXPERT_RATE_ERR = "SET_EXPERT_RATE_ERR";
export const SET_OPTION_FOR_CENTER = "SET_OPTION_FOR_CENTER";
export const SET_OPTION_FOR_CENTER_LOADING = "SET_OPTION_FOR_CENTER_LOADING";
export const CLEAN_CENTER = "CLEAN_CENTER";
export const CENTER_UPDATE_LOAD = "CENTER_UPDATE_LOAD";
export const CENTER_UPDATE = "CENTER_UPDATE";
export const CENTER_UPDATE_ERR = "CENTER_UPDATE_ERR";
export const GET_EDITED_CENTER = "GET_EDITED_CENTER";
export const LOAD_EDITED_CENTER = "LOAD_EDITED_CENTER";
export const ERR_EDITED_CENTER = "ERR_EDITED_CENTER";

export const SET_OTHER_ADDRESS_LOAD = "SET_OTHER_ADDRESS_LOAD";
export const SET_OTHER_ADDRESS = "SET_OTHER_ADDRESS";
export const SET_OTHER_ADDRESS_ERR = "SET_OTHER_ADDRESS_ERR";

export const CENTER_PIC_LOAD_DONE = "CENTER_PIC_LOAD_DONE";

/************  --CENTERS--  *************/
export const GET_CENTERS = "GET_CENTERS";
export const GET_CENTERS_ERR = "GET_CENTERS_ERR";
export const ADD_CENTER = "ADD_CENTER";
export const UPDATE_CENTER = "UPDATE_CENTER";
export const REMOVE_CENTER = "REMOVE_CENTER";
export const REMOVE_CENTER_ERR = "REMOVE_CENTER_ERR";
export const CENTERS_LOAD = "CENTERS_LOAD";
export const YOUR_CENTER = "YOUR_CENTER";
export const CLEAN_CENTERS = "CLEAN_CENTERS";
export const ADD_CENTER_ERR = "ADD_CENTER_ERR";
export const CENTER_PIC_LOAD = "CENTER_PIC_LOAD";
export const CENTER_ADD_PIC = "CENTER_ADD_PIC";

export const SET_CENTER_TO_POPUP = "SET_CENTER_TO_POPUP";
export const SET_POPUP_TO_NULL = "SET_POPUP_TO_NULL";

export const REMOVE_CENTER_ODD_ADD_LOADING = "REMOVE_CENTER_ODD_ADD_LOADING";
export const REMOVE_CENTER_ODD_ADD_END = "REMOVE_CENTER_ODD_ADD_END";

export const GET_CENTERS_COUNT = "GET_CENTERS_COUNT";
export const GET_CENTERS_COUNT_LOAD = "GET_CENTERS_COUNT_LOAD";
export const GET_CENTERS_COUNT_ERR = "GET_CENTERS_COUNT_ERR";

/************  --CENTER_TYPES--  *************/
export const GET_CENTER_TYPES = "GET_CENTER_TYPES";
export const GET_CENTER_TYPES_ERR = "GET_CENTER_TYPES_ERR";
export const ADD_CENTER_TYPE = "ADD_CENTER_TYPE";
export const REMOVE_CENTER_TYPE = "REMOVE_CENTER_TYPE";
export const CENTER_TYPE_LOAD = "CENTER_TYPE_LOAD";
export const YOUR_CENTER_TYPE = "YOUR_CENTER_TYPE";
export const CLEAN_CENTER_TYPE = "CLEAN_CENTER_TYPE";
export const ADD_CENTER_TYPE_ERR = "ADD_CENTER_TYPE_ERR";
export const CENTER_TYPE_PIC_LOAD = "CENTER_TYPE_PIC_LOAD";
export const CENTER_TYPE_ADD_PIC = "CENTER_TYPE_ADD_PIC";
export const UPDATE_CENTER_TYPE = "UPDATE_CENTER_TYPE";
export const UPDATE_CENTER_TYPE_ERR = "UPDATE_CENTER_TYPE_ERR";
export const CENTER_TYPE_UPDATE_LOAD = "CENTER_TYPE_UPDATE_LOAD";
export const SET_CENTER_LIKE_LOAD = "SET_CENTER_LIKE_LOAD";
export const SET_CENTER_LIKE = "SET_CENTER_LIKE";

/************  --ETEHADIYES--  *************/
export const GET_ETEHADIYES = "GET_ETEHADIYES";
export const GET_ETEHADIYES_ERR = "GET_ETEHADIYES_ERR";
export const ADD_ETEHADIYE = "ADD_ETEHADIYE";
export const REMOVE_ETEHADIYE = "REMOVE_ETEHADIYE";
export const ETEHADIYE_LOAD = "ETEHADIYE_LOAD";
export const YOUR_ETEHADIYE = "YOUR_ETEHADIYE";
export const CLEAN_ETEHADIYE = "CLEAN_ETEHADIYE";
export const ADD_ETEHADIYE_ERR = "ADD_ETEHADIYE_ERR";
export const ETEHADIYE_PIC_LOAD = "ETEHADIYE_PIC_LOAD";
export const ETEHADIYE_ADD_PIC = "ETEHADIYE_ADD_PIC";
export const UPDATE_ETEHADIYE = "UPDATE_ETEHADIYE";
export const UPDATE_ETEHADIYE_ERR = "UPDATE_ETEHADIYE_ERR";
export const ETEHADIYE_UPDATE_LOAD = "ETEHADIYE_UPDATE_LOAD";

/************  --OTAGH_ASNAFS--  *************/
export const GET_OTAGH_ASNAFS = "GET_OTAGH_ASNAFS";
export const GET_OTAGH_ASNAFS_ERR = "GET_OTAGH_ASNAFS_ERR";
export const ADD_OTAGH_ASNAF = "ADD_OTAGH_ASNAF";
export const REMOVE_OTAGH_ASNAF = "REMOVE_OTAGH_ASNAF";
export const OTAGH_ASNAF_LOAD = "OTAGH_ASNAF_LOAD";
export const YOUR_OTAGH_ASNAF = "YOUR_OTAGH_ASNAF";
export const CLEAN_OTAGH_ASNAF = "CLEAN_OTAGH_ASNAF";
export const ADD_OTAGH_ASNAF_ERR = "ADD_OTAGH_ASNAF_ERR";
export const OTAGH_ASNAF_PIC_LOAD = "OTAGH_ASNAF_PIC_LOAD";
export const OTAGH_ASNAF_ADD_PIC = "OTAGH_ASNAF_ADD_PIC";
export const UPDATE_OTAGH_ASNAF = "UPDATE_OTAGH_ASNAF";
export const UPDATE_OTAGH_ASNAF_ERR = "UPDATE_OTAGH_ASNAF_ERR";
export const OTAGH_ASNAF_UPDATE_LOAD = "OTAGH_ASNAF_UPDATE_LOAD";

/************  --OTAGH_BAZARGANIS--  *************/
export const GET_OTAGH_BAZARGANIS = "GET_OTAGH_BAZARGANIS";
export const GET_OTAGH_BAZARGANIS_ERR = "GET_OTAGH_BAZARGANIS_ERR";
export const ADD_OTAGH_BAZARGANI = "ADD_OTAGH_BAZARGANI";
export const REMOVE_OTAGH_BAZARGANI = "REMOVE_OTAGH_BAZARGANI";
export const OTAGH_BAZARGANI_LOAD = "OTAGH_BAZARGANI_LOAD";
export const YOUR_OTAGH_BAZARGANI = "YOUR_OTAGH_BAZARGANI";
export const CLEAN_OTAGH_BAZARGANI = "CLEAN_OTAGH_BAZARGANI";
export const ADD_OTAGH_BAZARGANI_ERR = "ADD_OTAGH_BAZARGANI_ERR";
export const OTAGH_BAZARGANI_PIC_LOAD = "OTAGH_BAZARGANI_PIC_LOAD";
export const OTAGH_BAZARGANI_ADD_PIC = "OTAGH_BAZARGANI_ADD_PIC";
export const UPDATE_OTAGH_BAZARGANI = "UPDATE_OTAGH_BAZARGANI";
export const UPDATE_OTAGH_BAZARGANI_ERR = "UPDATE_OTAGH_BAZARGANI_ERR";
export const OTAGH_BAZARGANI_UPDATE_LOAD = "OTAGH_BAZARGANI_UPDATE_LOAD";

/************  --MOODS--  *************/
export const GET_MOODS = "GET_MOODS";
export const GET_MOODS_ERR = "GET_MOODS_ERR";
export const ADD_MOOD = "ADD_MOOD";
export const REMOVE_MOOD = "REMOVE_MOOD";
export const MOOD_LOAD = "MOOD_LOAD";
export const YOUR_MOOD = "YOUR_MOOD";
export const CLEAN_MOOD = "CLEAN_MOOD";
export const ADD_MOOD_ERR = "ADD_MOOD_ERR";
export const MOOD_PIC_LOAD = "MOOD_PIC_LOAD";
export const MOOD_ADD_PIC = "MOOD_ADD_PIC";
export const UPDATE_MOOD = "UPDATE_MOOD";
export const UPDATE_MOOD_ERR = "UPDATE_MOOD_ERR";
export const MOOD_UPDATE_LOAD = "MOOD_UPDATE_LOAD";

/************  --WARESLIDERS--  *************/
export const GET_WARESLIDERS = "GET_WARESLIDERS";
export const GET_WARESLIDERS_ERR = "GET_WARESLIDERS_ERR";
export const ADD_WARESLIDER = "ADD_WARESLIDER";
export const REMOVE_WARESLIDER = "REMOVE_WARESLIDER";
export const WARESLIDER_LOAD = "WARESLIDER_LOAD";
export const YOUR_WARESLIDER = "YOUR_WARESLIDER";
export const CLEAN_WARESLIDER = "CLEAN_WARESLIDER";
export const ADD_WARESLIDER_ERR = "ADD_WARESLIDER_ERR";
export const WARESLIDER_PIC_LOAD = "WARESLIDER_PIC_LOAD";
export const WARESLIDER_ADD_PIC = "WARESLIDER_ADD_PIC";
export const UPDATE_WARESLIDER = "UPDATE_WARESLIDER";
export const UPDATE_WARESLIDER_ERR = "UPDATE_WARESLIDER_ERR";
export const WARESLIDER_UPDATE_LOAD = "WARESLIDER_UPDATE_LOAD";

/************  --PROMOTION--  *************/
export const GET_PROMOTIONS = "GET_PROMOTIONS";
export const GET_PROMOTIONS_ERR = "GET_PROMOTIONS_ERR";
export const ADD_PROMOTION = "ADD_PROMOTION";
export const REMOVE_PROMOTION = "REMOVE_PROMOTION";
export const PROMOTION_LOAD = "PROMOTION_LOAD";
export const YOUR_PROMOTION = "YOUR_PROMOTION";
export const CLEAN_PROMOTION = "CLEAN_PROMOTION";
export const ADD_PROMOTION_ERR = "ADD_PROMOTION_ERR";
export const PROMOTION_PIC_LOAD = "PROMOTION_PIC_LOAD";
export const PROMOTION_ADD_PIC = "PROMOTION_ADD_PIC";
export const UPDATE_PROMOTION = "UPDATE_PROMOTION";
export const UPDATE_PROMOTION_ERR = "UPDATE_PROMOTION_ERR";
export const PROMOTION_UPDATE_LOAD = "PROMOTION_UPDATE_LOAD";

/************  --WARE_OPTION--  *************/
export const GET_WARE_OPTIONS = "GET_WARE_OPTIONS";
export const GET_WARE_OPTIONS_ERR = "GET_WARE_OPTIONS_ERR";
export const ADD_WARE_OPTION = "ADD_WARE_OPTION";
export const REMOVE_WARE_OPTION = "REMOVE_WARE_OPTION";
export const WARE_OPTION_LOAD = "WARE_OPTION_LOAD";
export const YOUR_WARE_OPTION = "YOUR_WARE_OPTION";
export const CLEAN_WARE_OPTION = "CLEAN_WARE_OPTION";
export const ADD_WARE_OPTION_ERR = "ADD_WARE_OPTION_ERR";
export const WARE_OPTION_PIC_LOAD = "WARE_OPTION_PIC_LOAD";
export const WARE_OPTION_ADD_PIC = "WARE_OPTION_ADD_PIC";
export const UPDATE_WARE_OPTION = "UPDATE_WARE_OPTION";
export const UPDATE_WARE_OPTION_ERR = "UPDATE_WARE_OPTION_ERR";
export const WARE_OPTION_UPDATE_LOAD = "WARE_OPTION_UPDATE_LOAD";

/************  --WARE_TYPE--  *************/
export const GET_WARE_TYPES = "GET_WARE_TYPES";
export const ADD_WARE_TYPE = "ADD_WARE_TYPE";
export const REMOVE_WARE_TYPE = "REMOVE_WARE_TYPE";
export const WARE_TYPE_LOAD = "WARE_TYPE_LOAD";
export const YOUR_WARE_TYPE = "YOUR_WARE_TYPE";
export const CLEAN_WARE_TYPE = "CLEAN_WARE_TYPE";
export const ADD_WARE_TYPE_ERR = "ADD_WARE_TYPE_ERR";
export const WARE_TYPE_PIC_LOAD = "WARE_TYPE_PIC_LOAD";
export const WARE_TYPE_ADD_PIC = "WARE_TYPE_ADD_PIC";
export const WARE_TYPE_UPDATE = "WARE_TYPE_UPDATE";
export const WARE_TYPE_UPDATE_ERR = "WARE_TYPE_UPDATE_ERR";
export const WARE_TYPE_UPDATE_LOAD = "WARE_TYPE_UPDATE_LOAD";
export const CHANGE_WARE_RATE_LOADING = "CHANGE_WARE_RATE_LOADING";
export const CHANGE_YOUR_WARE_RATE = "CHANGE_YOUR_WARE_RATE";
export const WARE_ADD_LOAD = "WARE_ADD_LOAD";

/************  --WARES--  *************/
export const GET_WARES = "GET_WARES";
export const GET_WARE = "GET_WARE";
export const ADD_WARE = "ADD_WARE";
export const REMOVE_WARE = "REMOVE_WARE";
export const REMOVE_WARE_ERR = "REMOVE_WARE_ERR";
export const WARE_LOAD = "WARE_LOAD";
export const SELECTED_WARE = "SELECTED_WARE";
export const CLEAN_WARE = "CLEAN_WARE";
export const ADD_WARE_ERR = "ADD_WARE_ERR";
export const WARE_PIC_LOAD = "WARE_PIC_LOAD";
export const WARE_ADD_PIC = "WARE_ADD_PIC";
export const LAST_WARE = "LAST_WARE";
export const FIRST_WARE = "FIRST_WARE";
export const WARE_NP_LOAD = "WARE_NP_LOAD";
export const CLEAN_SELECTED_WARE = "CLEAN_SELECTED_WARE";

export const UPDATE_WARE_ERR = "UPDATE_WARE_ERR";
export const UPDATE_WARE = "UPDATE_WARE";
export const WARE_UPDATE_LOAD = "WARE_UPDATE_LOAD";

export const GET_RECOMAND_CENTER = "GET_RECOMAND_CENTER";
export const GET_RECOMAND_CENTER_LOAD = "GET_RECOMAND_CENTER_LOAD";
export const GET_RECOMAND_TYPE = "GET_RECOMAND_TYPE";
export const GET_RECOMAND_TYPE_LOAD = "GET_RECOMAND_TYPE_LOAD";
export const GET_RECOMAND_MOOD = "GET_RECOMAND_MOOD";
export const GET_RECOMAND_MOOD_LOAD = "GET_RECOMAND_MOOD_LOAD";
export const CLEAR_QUERY_WARE = "CLEAR_QUERY_WARE";

export const GET_SAILS_SORTED_WARES_LOAD = "GET_SAILS_SORTED_WARES_LOAD";
export const GET_SAILS_SORTED_WARES = "GET_SAILS_SORTED_WARES";
export const GET_FAVORITE_SORTED_WARES_LOAD = "GET_FAVORITE_SORTED_WARES_LOAD";
export const GET_FAVORITE_SORTED_WARES = "GET_FAVORITE_SORTED_WARES";

/************  --LABELS--  *************/
export const GET_LABELS = "GET_LABELS";
export const GET_LABELS_ERR = "GET_LABELS_ERR";
export const ADD_LABEL = "ADD_LABEL";
export const REMOVE_LABEL = "REMOVE_LABEL";
export const LABEL_LOAD = "LABEL_LOAD";
export const YOUR_LABEL = "YOUR_LABEL";
export const CLEAN_LABEL = "CLEAN_LABEL";
export const ADD_LABEL_ERR = "ADD_LABEL_ERR";
export const LABEL_PIC_LOAD = "LABEL_PIC_LOAD";
export const LABEL_ADD_PIC = "LABEL_ADD_PIC";
export const UPDATE_LABEL = "UPDATE_LABEL";
export const UPDATE_LABEL_ERR = "UPDATE_LABEL_ERR";
export const LABEL_UPDATE_LOAD = "LABEL_UPDATE_LOAD";

/************  --CHANGE_RATE--  *************/
export const CHANGE_QUALITY_LOADING = "CHANGE_QUALITY_LOADING";
export const CHANGE_QUALITY_RATE = "CHANGE_QUALITY_RATE";
export const CHANGE_PRICE_LOADING = "CHANGE_PRICE_LOADING";
export const CHANGE_PRICE_RATE = "CHANGE_PRICE_RATE";
export const CHANGE_SALESMAN_LOADING = "CHANGE_SALESMAN_LOADING";
export const CHANGE_SALESMAN_RATE = "CHANGE_SALESMAN_RATE";

/************  --RATE--  *************/
export const GET_RATE = "GET_RATE";
export const GET_NEXT_RATE = "GET_NEXT_RATE";
export const RATE_LOAD = "RATE_LOAD";
export const GET_YOUR_RATE = "GET_YOUR_RATE";
export const CLEAN_RATE = "CLEAN_RATE";
export const ACCEPTED_RATE = "ACCEPTED_RATE";
export const ACCEPT_RATE_LOAD = "ACCEPT_RATE_LOAD";
export const DENIED_RATE = "DENIED_RATE";
export const WARE_RATE_LOAD = "WARE_RATE_LOAD";
export const GET_WARE_RATE = "GET_WARE_RATE";
export const TEXT_RATE_LOAD = "TEXT_RATE_LOAD";
export const SET_YOUR_WARE_RATE_LOAD = "SET_YOUR_WARE_RATE_LOAD";
export const CLEAN_WARE_RATES = "CLEAN_WARE_RATES";
export const CLEAN_YOUR_WARE_RATE = "CLEAN_YOUR_WARE_RATE";
export const UP_RATE_IN_RATES = "UP_RATE_IN_RATES";
export const SET_REPLY_LOAD = "SET_REPLY_LOAD";
export const SET_REPLY = "SET_REPLY";
export const SET_REPLY_ERR = "SET_REPLY_ERR";

export const GET_YOUR_WARE_RATE_ERR = "GET_YOUR_WARE_RATE_ERR";

/************  --VOTE--  *************/
export const ADD_VOTE_LOAD = "ADD_VOTE_LOAD";
export const UP_VOTE_MASSAGE = "UP_VOTE_MASSAGE";

/************  --OPTION--  *************/
export const GET_OPTIONS = "GET_OPTIONS";
export const ADD_OPTION = "ADD_OPTION";
export const REMOVE_OPTION = "REMOVE_OPTION";
export const OPTION_LOAD = "OPTION_LOAD";
export const UPDATE_OPTION = "UPDATE_OPTION";
export const UPDATE_OPTION_ERR = "UPDATE_OPTION_ERR";
export const OPTION_UPDATE_LOAD = "OPTION_UPDATE_LOAD";
export const YOUR_OPTION = "YOUR_OPTION";
export const CLEAN_OPTION = "CLEAN_OPTION";
export const ADD_OPTION_ERR = "ADD_OPTION_ERR";
export const OPTION_PIC_LOAD = "OPTION_PIC_LOAD";
export const OPTION_ADD_PIC = "OPTION_ADD_PIC";

/************  --SEARCH--  *************/
export const ON_SEARCH_TEXT_CHANGE = "ON_SEARCH_TEXT_CHANGE",
  SET_SELECTED_PARISH = "SET_SELECTED_PARISH",
  ADD_RASTE_TO_QUERY = "ADD_RASTE_TO_QUERY",
  REMOVE_RASTE_FROM_QUERY = "REMOVE_RASTE_FROM_QUERY",
  SET_GEO_SEARCH = "SET_GEO_SEARCH",
  CLEAR_SELECTED_PARISH = "CLEAR_SELECTED_PARISH",
  SET_NEARBY_QUERY = "SET_NEARBY_QUERY",
  SET_SEARCH_SORT = "SET_SEARCH_SORT",
  CLEAR_SEARCH_SORT = "CLEAR_SEARCH_SORT",
  SET_REACH_END_CENTERS = "SET_REACH_END_CENTERS",
  INCREASE_QUERY_PAGE = "INCREASE_QUERY_PAGE";

/************  --SEARCH--  *************/
export const GET_REPORTS = "GET_REPORTS",
  REPORTS_LOAD = "REPORTS_LOAD",
  SELECTED_REPORT = "SELECTED_REPORT",
  GET_REPORTS_ERR = "GET_REPORTS_ERR",
  CLEAN_REPORTS = "CLEAN_REPORTS",
  ADD_REPORT_LOAD = "ADD_REPORT_LOAD",
  ADD_REPORT = "ADD_REPORT";

/************  --STATE--  *************/
export const GET_STATES = "GET_STATES";
export const ADD_STATE = "ADD_STATE";
export const REMOVE_STATE = "REMOVE_STATE";
export const STATE_LOAD = "STATE_LOAD";
export const UPDATE_STATE = "UPDATE_STATE";
export const UPDATE_STATE_ERR = "UPDATE_STATE_ERR";
export const STATE_UPDATE_LOAD = "STATE_UPDATE_LOAD";
export const CLEAN_STATE = "CLEAN_STATE";
export const ADD_STATE_ERR = "ADD_STATE_ERR";
export const ADD_TOWN_TO_STATE = "ADD_TOWN_TO_STATE";
export const ADD_TOWN_TO_STATE_ERR = "ADD_TOWN_TO_STATE_ERR";
export const ADD_TOWN_LOAD = "ADD_TOWN_LOAD";
export const SHOW_TOWNS = "SHOW_TOWNS";
export const OFF_SHOW_TOWNS = "OFF_SHOW_TOWNS";
