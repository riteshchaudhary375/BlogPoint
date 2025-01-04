import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice.js";

const rootReducers = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
