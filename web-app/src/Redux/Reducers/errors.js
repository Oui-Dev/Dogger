import {
  GET_ERRORS,
  UPDATE_ERROR_STATUS,
  UPDATE_ERROR_ASSIGN
} from "../types";

const initialState = [];

function errorReducer(errors = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ERRORS:
      return payload;
    case UPDATE_ERROR_STATUS:
      return errors.map((error) => {
        if (error.id === payload.id) {
          return {
            ...error,
            status: payload.status
          };
        } else {
          return error;
        }
      });
    case UPDATE_ERROR_ASSIGN:
      return errors.map((error) => {
        if (error.id === payload.id) {
          return {
            ...error,
            assign: payload.assign
          };
        } else {
          return error;
        }
      });
    default:
      return errors;
  }
}

export default errorReducer;