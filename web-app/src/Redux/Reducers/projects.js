import {
  CREATE_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../types";

const initialState = [];

function projectsReducer(projects = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return [...projects, payload];

    case GET_PROJECTS:
      return payload;

    case UPDATE_PROJECT:
      return projects.map((project) => {
        if (project.id === payload.id) {
          return {
            ...project,
            ...payload,
          };
        } else {
          return project;
        }
      });

    case DELETE_PROJECT:
      return projects.filter(({ id }) => id !== payload.id);

    default:
      return projects;
  }
}

export default projectsReducer;