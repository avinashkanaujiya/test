import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
