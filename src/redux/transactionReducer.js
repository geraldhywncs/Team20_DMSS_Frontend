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
    updateTransaction: (state, action) => {
      const { id, updatedTransaction } = action.payload;
      const index = state.transactions.findIndex(transaction => transaction.id === id);
      if (index !== -1) {
        state.transactions[index] = updatedTransaction;
      }
    },
    resetTransaction: (state) => {
      state.transactionAdded = false;
    },
  },
});

export const { addTransaction, updateTransaction, resetTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
