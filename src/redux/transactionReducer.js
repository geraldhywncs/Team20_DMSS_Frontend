import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionAdded: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state) => {
      state.transactionAdded = true;
    },
    resetTransaction: (state) => {
      state.transactionAdded = false;
    },
  },
});

export const { addTransaction, resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
