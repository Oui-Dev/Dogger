import {
  GET_ERRORS,
  UPDATE_ERROR_STATUS,
  UPDATE_ERROR_ASSIGN
} from "../types";

import ErrorDataService from "../Services/ErrorService";

export const retrieveErrors = () => async (dispatch) => {
  try {
    const res = await ErrorDataService.getAll();

    dispatch({
      type: GET_ERRORS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateErrorStatus = (id, data) => async (dispatch) => {
  try {
    const res = await ErrorDataService.updateStatus(id, data);

    dispatch({
      type: UPDATE_ERROR_STATUS,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateErrorAssign = (id, data) => async (dispatch) => {
  try {
    const res = await ErrorDataService.updateAssign(id, data);

    dispatch({
      type: UPDATE_ERROR_ASSIGN,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};