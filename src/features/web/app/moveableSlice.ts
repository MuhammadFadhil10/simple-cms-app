import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MoveableState {
  activeId: string;
}

const initialState: MoveableState = {
  activeId: "",
};

export const moveableSlice = createSlice({
  name: "moveable",
  initialState,
  reducers: {
    handleActiveId: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    },
  },
});

export const { handleActiveId } = moveableSlice.actions;

export default moveableSlice.reducer;
