import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navTabActive: 0,
  navigation: [
    { name: "Home", href: "/" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Analysis", href: "/analysis" },
    { name: "Kite Login", href: "/login" },
  ],
};

export const navSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    setFocus: (state, action) => {
      console.log(state.navTabActive, "navTabActive");
      state.navTabActive = action.payload;
      console.log(state.navTabActive, "navTabActive");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFocus } = navSlice.actions;

export default navSlice.reducer;
