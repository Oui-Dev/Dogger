import {
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../types";

import ProjectDataService from "../Services/ProjectService";
import { toast } from 'react-toastify';

const isOffline = () => {
  return !navigator.onLine;
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

export const createProject = (data) => async (dispatch) => {
  try {
    if(isOffline()) {
      toast.error('You cannot perform this action while offline !');
      return Promise.reject();
    }
    const res = await ProjectDataService.create(data);
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data.project,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject();
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    if(isOffline()) {
      toast.error('You cannot perform this action while offline !');
      return Promise.reject();
    }
    const res = await ProjectDataService.update(id, data);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data.project,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject();
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    if(isOffline()) {
      toast.error('You cannot perform this action while offline !');
      return Promise.reject();
    }
    const res = await ProjectDataService.remove(id);
    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject();
  }
};
