import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const initialState = {
  data: [],
  loaded: false,
};



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

export const updateProjectAsync = createAsyncThunk(
  "projects/update",
  async ({ id, updates }) => {
    const result = await axios.patch(`${PROJECTS_URL}/${id}`, updates);
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
      state.data.push(action.payload);
    });
    
    builder .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.data.findIndex((p) => p.id === updatedProject.id);
        if (index !== -1) {
          state.data[index] = updatedProject;  
        }
      })

    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      const deleted = action.payload;
      state.data = state.data.filter((p) => p.id !== deleted.id);
    });
  },
});

export const { clearSaved } = projectsSlice.actions;
export default projectsSlice.reducer;
