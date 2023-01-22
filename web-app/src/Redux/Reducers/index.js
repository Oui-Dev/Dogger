import { combineReducers } from "redux";
import projectsReducer from "./projects";
import userReducer from "./user";
import errorReducer from "./errors";
import statsReducer from "./stats";

export default combineReducers({
  projects: projectsReducer,
  user: userReducer,
  errors: errorReducer,
  stats: statsReducer,
});
