import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

// Get User Details - Admin
export const userDetails = createAsyncThunk(
  "userDetails/userDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/admin/user/${id}`);

      return data.user;
    } catch (error) {
      return rejectWithValue(handleApiErrors(error));
    }
  }
);

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export const { clearErrors } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
