import {
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_DEVICES,
} from "../types";

const initialState = null;

function userReducer(user = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USER:
      return payload;
    case LOGIN:
      return payload;
    case LOGOUT:
      return payload;
    case REGISTER:
      return payload;
    case UPDATE_USER:
      return payload;
    case DELETE_USER:
      return null;
    case GET_USER_DEVICES:
      return payload;
    default:
      return user;
  }
}

export default userReducer;