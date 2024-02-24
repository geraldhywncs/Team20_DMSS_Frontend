import { configureStore } from "@reduxjs/toolkit";
import userNavReducer from "./userNavReducer";

const store = configureStore({
  reducer: {
    userNavbarStore: userNavReducer,
  },
});

export default store;
