import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  open: boolean;
}

const initialState: SidebarState = {
  open: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { toggleSidebarOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
