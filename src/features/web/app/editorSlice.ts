import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorZoom } from "@/features/web";

// Define a type for the slice state
interface EditorState {
  zoomValue: EditorZoom;
  mousePosition: { x: number; y: number };
}

// Define the initial state using that type
const initialState: EditorState = {
  zoomValue: 70,
  mousePosition: { x: 0, y: 0 },
};

export const editorSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    incrementZoom: (state) => {
      if (state.zoomValue === 200) {
        state.zoomValue = 200;

        return;
      }

      state.zoomValue += 10;
    },
    decrementZoom: (state) => {
      if (state.zoomValue === 10) {
        state.zoomValue = 10;

        return;
      }

      state.zoomValue -= 10;
    },

    changeMousePosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.mousePosition = { x: action.payload.x, y: action.payload.y };
    },
  },
});

export const { incrementZoom, decrementZoom, changeMousePosition } =
  editorSlice.actions;

export default editorSlice.reducer;
