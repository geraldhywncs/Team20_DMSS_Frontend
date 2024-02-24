// src/redux/UserNavbarSlice.js (or NavbarSlice.js)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buttons: [
    { name: "Home", active: false },
    { name: "Dashboard", active: false },
    { name: "Transactions", active: false },
    { name: "Friends", active: false },
    { name: "Groups", active: false },
    { name: "Profile", active: false },
  ],
};

const userNavbarSlice = createSlice({
  name: "userNavbar",
  initialState,
  reducers: {
    toggleButton: (state, action) => {
      const { buttonName } = action.payload;
      state.buttons = state.buttons.map((button) => ({
        ...button,
        active: button.name === buttonName,
      }));
    },
  },
});

export const { toggleButton } = userNavbarSlice.actions;

export default userNavbarSlice.reducer;
