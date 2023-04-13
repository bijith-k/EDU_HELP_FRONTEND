import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    selectedIconIndex: null,
  },
  reducers: {
    selectedIcon: (state, action) => {
      state.selectedIconIndex = action.payload;
    },
  },
});

export const { selectedIcon } = sidebarSlice.actions;
export default sidebarSlice.reducer;
