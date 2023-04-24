import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import createServerEncryptor from "./encryptor";

import authReducer from "./features/user/authSlice";
import userReducer from "./features/user/userSlice";
import forgotPasswordReducer from "./features/user/forgotPasswordSlice";

import allUsersReducer from "./features/user/allUsersSlice";
import userDetailsReducer from "./features/user/userDetailsSlice";

// Combines all reducers into one rootReducer
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

// Configuration for persisting state using redux-persist
const persistConfig = {
  key: "root",
  storage,
  transforms: [createServerEncryptor()],
  whitelist: ["auth"],
};

// Creates a new persisted reducer using the rootReducer and persistConfig
const persistedReducer = persistReducer(persistConfig, reducers);

// Configures the Redux store using persistedReducer, middleware, and devTools
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
