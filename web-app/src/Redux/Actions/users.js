import {
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
  LOGOUT_ALL,
  REGISTER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_DEVICES,
} from "../types";

import UserDataService from "../Services/UserService";

export const retrieveCurrentUser = () => async (dispatch) => {
  try {
    const res = await UserDataService.current();

    dispatch({
      type: GET_CURRENT_USER,
      payload: res.data.user,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await UserDataService.login(data);

    dispatch({
      type: LOGIN,
      payload: res.data.token,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await UserDataService.register(data);

    dispatch({
      type: REGISTER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await UserDataService.update(data);

    dispatch({
      type: UPDATE_USER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUser = () => async (dispatch) => {
  try {
    const res = await UserDataService.remove();

    dispatch({
      type: DELETE_USER,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logout = (data) => async (dispatch) => {
  try {
    await UserDataService.logout(data);

    dispatch({
      type: LOGOUT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logoutAll = () => async (dispatch) => {
  try {
    await UserDataService.logoutAll();

    dispatch({
      type: LOGOUT_ALL,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveUserDevices = () => async (dispatch) => {
  try {
    const res = await UserDataService.devices();

    dispatch({
      type: GET_USER_DEVICES,
      payload: res.data.devices,
    });
  } catch (err) {
    console.log(err);
  }
};