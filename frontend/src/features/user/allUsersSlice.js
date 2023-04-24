import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Get All Users - Admin
export const allUsers = createAsyncThunk(
  "allUsers/allUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/users`);

      return data.users;
    } catch (error) {
      return rejectWithValue(handleApiErrors(error));
    }
  }
);

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export const { clearErrors } = allUsersSlice.actions;

export default allUsersSlice.reducer;
