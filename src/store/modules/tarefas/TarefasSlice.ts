import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CreateTarefa {
    description: string;
    detail: string;
    token: string;
}

export interface Tarefa {
    description: string;
    detail: string;
}

const initialState: Tarefa = {
    description: "",
    detail: "",
};

export const createTarefa = createAsyncThunk('tasks/create', async(task: CreateTarefa, thunkAPI) => {
    const response = await axios.post(
        "https://api-tasks-list.herokuapp.com/task/", task
    );
    return response.data.data;
} )

const tarefaSlice = createSlice({
  name: 'tarefa',
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(createTarefa.fulfilled, (state, action) => {
      return {
          id: action.payload.id,
          description: action.payload.description,
          detail: action.payload.detail,
      }
    });
}});

export const { create, clear } = tarefaSlice.actions;
export default tarefaSlice.reducer;