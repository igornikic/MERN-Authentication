import axios from "axios";
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

// Update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(`/api/me/update`, userData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/password/update`,
        passwords,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update User - Admin
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/admin/user/${id}`,
        userData,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete User - Admin
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/admin/user/${id}`);

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfileReset: (state) => {
      state.isUpdated = false;
    },
    updatePasswordReset: (state) => {
      state.isUpdated = false;
    },
    updateUserReset: (state) => {
      state.isUpdated = false;
    },
    deleteUserReset: (state, action) => {
      state.isDeleted = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addMatcher(
        isAnyOf(
          updateProfile.pending,
          updatePassword.pending,
          updateUser.pending,
          deleteUser.pending
        ),
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProfile.fulfilled,
          updatePassword.fulfilled,
          updateUser.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          state.isUpdated = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          updateProfile.rejected,
          updatePassword.rejected,
          updateUser.rejected,
          deleteUser.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addDefaultCase((state, action) => {
        return state;
      });
  },
});

export const {
  updateProfileReset,
  updatePasswordReset,
  updateUserReset,
  deleteUserReset,
  clearErrors,
} = userSlice.actions;

export default userSlice.reducer;
