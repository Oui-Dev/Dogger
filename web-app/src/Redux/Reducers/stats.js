import {
  GET_STATS
} from "../types";

const initialState = [];

function statsReducer(stats = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STATS:
      return payload;

    default:
      return stats;
  }
}

export default statsReducer;