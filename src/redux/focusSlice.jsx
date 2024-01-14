import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFocus: "",
};

export const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    setFocus: (state, action) => {
      state.focus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFocus } = focusSlice.actions;

export default focusSlice.reducer;
