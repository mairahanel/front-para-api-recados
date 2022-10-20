import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: string;
    name: string;
    token?: string
}

export interface CreateUser {
    name: string;
    pass: string;
    Rpass: string;
}

const initialState: User = {
    id: "",
    name: "",
};

export const createUser = createAsyncThunk('users/create', async(user: CreateUser, thunkAPI) => {
    const response = await axios.post(
        "https://api-tasks-list.herokuapp.com/user/", user
    );
    return response.data.data;
} )

const userSlice = createSlice({
  name: 'user',
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
    builder.addCase(createUser.fulfilled, (state, action) => {
      return {
          id: action.payload.id,
          name: action.payload.name,
          tasklist: action.payload.tasklist
      }
    })

  },
});

export const { create, clear } = userSlice.actions;
export default userSlice.reducer;
