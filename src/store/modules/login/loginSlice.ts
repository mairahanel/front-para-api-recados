import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../user/UserSlice';

export interface LoginUser {
    name: string;
    pass: string;
}

const initialState: User = {
    id: "",
    name: "",
};

export const loginUser = createAsyncThunk('users/login', async(user: LoginUser, thunkAPI) => {
    const response = await axios.post(
        "https://api-tasks-list.herokuapp.com/user/login", user
    );
    return response.data.data;
} )

const loginSlice = createSlice({
  name: 'login',
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
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
          id: action.payload.id,
          name: action.payload.userName,
          token: action.payload.token
      }
    })
}});

export const { create, clear } = loginSlice.actions;
export default loginSlice.reducer;
