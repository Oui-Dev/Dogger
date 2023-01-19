import {
  LOGIN,
  LOGOUT,
  LOGOUT_ALL,
  REGISTER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER_DEVICES,
} from "../types";

const initialState = [];

function usersReducer(users = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return payload;
    case LOGOUT:
      return [];
    case LOGOUT_ALL:
      return [];
    case REGISTER:
      return payload;
    case UPDATE_USER:
      return users.map((user) => {
        if (user.id === payload.id) {
          return {
            ...user,
            ...payload,
          };
        } else {
          return user;
        }
      });
    case DELETE_USER:
      return users.filter(({ id }) => id !== payload.id);
    case GET_USER_DEVICES:
      return users.map((user) => {
        if (user.id === payload.id) {
          return {
            ...user,
            devices: payload.devices,
          };
        } else {
          return user;
        }
      });
    default:
      return users;
  }
}

export default usersReducer;