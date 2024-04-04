import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buttons: [
    { name: "Dashboard", active: true },
    { name: "Transactions", active: false },
    { name: "Friends", active: false },
    { name: "Groups", active: false },
    { name: "Profile", active: false }
    // { name: "Logout", active: false}
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
