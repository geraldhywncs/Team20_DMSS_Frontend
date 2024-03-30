import { configureStore } from "@reduxjs/toolkit";
import userNavReducer from "./userNavReducer";
import transactionReducer from "./transactionReducer";

const store = configureStore({
  reducer: {
    userNavbarStore: userNavReducer,
    transaction: transactionReducer,
  },
});

export default store;
