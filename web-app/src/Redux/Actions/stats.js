import {
  GET_STATS
} from "../types";

import StatsDataService from "../Services/StatsService";

export const retrieveStatss = () => async (dispatch) => {
  try {
    const res = await StatsDataService.getAll();

    dispatch({
      type: GET_STATS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};