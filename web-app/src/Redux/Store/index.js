import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null
};

const BASE_URL = process.env.REACT_APP_API_URL;
const config = {
    headers: { Authorization: process.env.REACT_APP_TOKEN }
};

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    const response = await axios.get(BASE_URL + "/projects", config);
    return response.data;
});

export const postProject = createAsyncThunk("projects/postProject", async (project) => {
    console.log(project)
    const response = await axios.post(BASE_URL + "/projects/new", project, config);
    console.log(response)
    return response.data;
});

const projectsSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchProjects.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchProjects.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.data = state.data.concat(action.payload);
        },
        [fetchProjects.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
});

export const store = configureStore({
    reducer: {
        projects: projectsSlice.reducer
    }
});

export default store;



