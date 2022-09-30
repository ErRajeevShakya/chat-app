import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setLoggedUser: (state, action) => {
      state.user = action.payload;
    },
    clearLoggedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedUser, clearLoggedUser } = userSlice.actions;

export default userSlice.reducer;
