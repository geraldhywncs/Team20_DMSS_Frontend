import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionAdded: false,
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      state.transactionAdded = true;
    },
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.receipt_id === action.payload.receipt_id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload.updatedTransaction;
      }
      state.transactionAdded = true;
    },
    resetTransaction: (state) => {
      state.transactionAdded = false;
    },
  },
});

export const { addTransaction, editTransaction, resetTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
