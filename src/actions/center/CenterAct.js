import axios from "axios";
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
  ADD_PIC_CENTER_ERR,
  UPDATE_PROTECTED_CENTER_LOAD,
  UPDATE_PROTECTED_CENTER,
  UPDATE_PROTECTED_CENTER_ERR
} from "./CenterTypes";
import { RU } from "../RootTypes";
import { showMessage } from "react-native-flash-message";
import { getItem } from "../utils/AsyncStorageAct";
import { teamcheColors } from "../../styles/MyStyles";

export const setCenter = center => ({ type: GET_CENTER, payload: center });

export const getCenter = _id => {
  return dispatch => {
    dispatch({ type: CENTER_LOAD });
    return axios
      .get(`${RU}/center`, { params: { _id } })
      .then(resp => dispatch({ type: GET_CENTER, payload: resp.data.center }))
      .catch(err =>
        dispatch({ type: GET_CENTER_ERR, payload: err.response.data })
      );
  };
};

export const addPicToCenter = (file, _id) => {
  return async dispatch => {
    dispatch({ type: ADD_PIC_CENTER_LOAD });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", _id);
    let config = {
      onUploadProgress: progressEvent => {
        let percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // dispatch({ type: PIC_UPLOAD_PERCENT, payload: { i, percent } });
      },
      headers: {
        sabti: await getItem("token")
      }
    };

    return axios
      .put(`${RU}/center/add/one/pic`, formData, config)
      .then(resp =>
        dispatch({ type: ADD_PIC_CENTER, payload: resp.data.center })
      )
      .catch(err =>
        dispatch({ type: ADD_PIC_CENTER_ERR, payload: err.response.data })
      );
  };
};

export const setLocationLoad = () => ({ type: SET_LOCATION_CENTER_LOAD });

export const setLocation = LocId => {
  return async dispatch => {
    dispatch({ type: SET_LOCATION_CENTER_LOAD });
    const token = await getItem("token");
    return axios
      .post(`${RU}/center/set/location`, LocId, { headers: { sabti: token } })
      .then(resp => {
        showMessage({
          message: "ثبت موقعیت",
          description: "موقعیت با موفقیت ثبت شد",
          type: "success",
          backgroundColor: teamcheColors.seaFoam,
          color: teamcheColors.lightPink,
          icon: "success"
        });
        return dispatch({
          type: SET_LOCATION_CENTER,
          payload: resp.data.center
        });
      })
      .catch(err => {
        showMessage({
          message: "ثبت موقعیت",
          description:
            "متاسفانه مشکلی در ثبت موقعیت به وجود آمده لطفا دوباره تلاش کنید",
          type: "danger",
          backgroundColor: teamcheColors.dullRed,
          color: teamcheColors.lightPink,
          icon: "danger"
        });

        return dispatch({
          type: SET_LOCATION_CENTER_ERR,
          payload: err.response.data
        });
      });
  };
};

export const updateProtectedCenter = center => {
  return async dispatch => {
    dispatch({ type: UPDATE_PROTECTED_CENTER_LOAD });
    const token = await getItem("token");
    return axios
      .post(`${RU}/center/update/protected`, center, {
        headers: { sabti: token }
      })
      .then(resp => {
        showMessage({
          message: "بروزرسانی صنف",
          description: "بروزرسانی صنف با موفقیت انجام شد",
          type: "success",
          backgroundColor: teamcheColors.seaFoam,
          color: teamcheColors.lightPink,
          icon: "success"
        });
        return dispatch({
          type: UPDATE_PROTECTED_CENTER,
          payload: resp.data.center
        });
      })
      .catch(err => {
        showMessage({
          message: "بروزرسانی صنف",
          description:
            "متاسفانه مشکلی در بروزرسانی صنف به وجود آمده لطفا دوباره تلاش کنید",
          type: "danger",
          backgroundColor: teamcheColors.dullRed,
          color: teamcheColors.lightPink,
          icon: "danger"
        });

        return dispatch({
          type: UPDATE_PROTECTED_CENTER_ERR,
          payload: err.response.data
        });
      });
  };
};

export const cleanCenter = () => ({ type: CLEAN_CENTER });
