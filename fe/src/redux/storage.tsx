import { configureStore } from "@reduxjs/toolkit";
import toggleSideMenuSlice from "./toggleSideMenuSlice";
import querySlice from "./querySlice";
import ticketSlice from "./bookingSlice";

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import tripSlice from "./tripSlice";
import chatSlice from "./chatSlice";
import conversationSlice from "./conversationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  toggle: toggleSideMenuSlice,
  query: querySlice,
  ticket: ticketSlice,
  trip: tripSlice,
  chat: chatSlice,
  conversation : conversationSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
