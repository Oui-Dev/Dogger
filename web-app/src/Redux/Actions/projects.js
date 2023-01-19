import {
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../types";

import ProjectDataService from "../Services/ProjectService";

export const createProject = (data) => async (dispatch) => {
  try {
    const res = await ProjectDataService.create(data);

    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProjects = () => async (dispatch) => {
  try {
    const res = await ProjectDataService.getAll();

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    const res = await ProjectDataService.update(id, data);

    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await ProjectDataService.remove(id);

    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};
