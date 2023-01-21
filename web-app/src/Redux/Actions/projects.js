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
      payload: res.data.project,
    });

    return Promise.resolve();
  } catch (err) {
    return Promise.reject();
  }
};

export const retrieveProjects = () => async (dispatch) => {
  try {
    const res = await ProjectDataService.getAll();
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.projects,
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
      payload: res.data.project,
    });

    return Promise.resolve();
  } catch (err) {
    console.log(err);
    return Promise.reject();
  }
};


//TODO:
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
