import {
  GET_STATS
} from "../types";

import StatsDataService from "../Services/StatsService";

export const retrieveStats = () => async (dispatch) => {
  try {
    const res = await StatsDataService.getAll();

    dispatch({
      type: GET_STATS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};