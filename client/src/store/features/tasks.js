import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
};


const TASKS_URL = "http://localhost:3000/tasks";

export const getTasksAsync = createAsyncThunk(
  "tasks/getList",
  async (projectId = "") => {
    const result = await axios.get(`http://localhost:3000/tasks/${projectId}`);
    return result.data;
  }
);

export const saveTaskAsync = createAsyncThunk("tasks/save", async (task) => {
  const result = await axios.post(TASKS_URL, task);
  return result.data;
});

export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }) => {
    const result = await axios.patch(`${TASK_URL}/${id}`, updates);
    return result.data;
  }
);

export const deleteTaskAsync = createAsyncThunk("tasks/delete", async (id) => {
  await axios.delete(`${TASKS_URL}/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(saveTaskAsync.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.data.findIndex((task) => task.id === updated.id);
      if (index !== -1) {
        state.data[index] = updated;
      }
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.data = state.data.filter((task) => task.id !== id);
    });
  },
});

export default tasksSlice.reducer;
