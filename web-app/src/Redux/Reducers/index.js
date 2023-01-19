import { combineReducers } from "redux";
import projectsReducer from "./projects";
import usersReducer from "./users";
import errorReducer from "./errors";
import statsReducer from "./stats";

export default combineReducers({
  projects: projectsReducer,
  users: usersReducer,
  errors: errorReducer,
  stats: statsReducer,
});
