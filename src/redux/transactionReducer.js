import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionAdded: false,
  transactions: []
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.transactionAdded = true;
    },
    resetTransaction: (state) => {
      state.transactionAdded = false;
    },
  },
});

export const { addTransaction,  resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
