import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedDate } = commonSlice.actions;

export default commonSlice.reducer;
