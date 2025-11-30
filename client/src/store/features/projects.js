import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const initialState = {
  data: [],
  loaded: false,
};

/*
  project: {
    id: string,
    title: string,
    priority: string,
    descrition: string,
  }

  CRUD
*/

const PROJECTS_URL = "http://localhost:3000/projects";

export const getProjectsAsync = createAsyncThunk(
  "projects/getList",
  async () => {
    const result = await axios.get(PROJECTS_URL);
    return result.data;
  }
);

export const saveProjectAsync = createAsyncThunk(
  "projects/save",
  async (project) => {
    const result = await axios.post(PROJECTS_URL, project);
    return result.data;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "projects/delete",
  async (projectId) => {
    const result = await axios.delete(`${PROJECTS_URL}/${projectId}`);
    return result.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // addProject: (state, action) => {
    //   // generate id
    //   // if integer needed:
    //   // const id = Date.now();
    //   const id = uuidv4(); // each time - new unique id

    //   // add to store
    //   const newProject = {
    //     id,
    //     ...action.payload,
    //   };

    //   state.data.push(newProject);
    // }
    clearSaved: (state) => {
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(saveProjectAsync.fulfilled, (state, action) => {
      state.loaded = true;
      // add saved project to current list so the UI shows it immediately
      state.data.push(action.payload);
    });
    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      const deleted = action.payload;
      state.data = state.data.filter((p) => p.id !== deleted.id);
    });
  },
});

export const { clearSaved } = projectsSlice.actions;
export default projectsSlice.reducer;
