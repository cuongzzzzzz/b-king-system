import { createSlice } from "@reduxjs/toolkit";

const toggleSideMenuSlice = createSlice({
  name: "sideMenu",
  initialState: { isShow: false },
  reducers: {
    toggleSideMenu: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { toggleSideMenu } = toggleSideMenuSlice.actions;
export default toggleSideMenuSlice.reducer;
