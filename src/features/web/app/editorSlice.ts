import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorZoom } from "@/features/web";

// Define a type for the slice state
interface EditorState {
  zoomValue: EditorZoom;
  mousePosition: { x: number; y: number };
  isHandMode: boolean;
  isGrabWindow: boolean;
}

// Define the initial state using that type
const initialState: EditorState = {
  zoomValue: 70,
  mousePosition: { x: 0, y: 0 },
  isHandMode: false,
  isGrabWindow: false,
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

    changeZoomByValue: (state, action: PayloadAction<EditorZoom>) => {
      state.zoomValue = action.payload;
    },

    changeMousePosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.mousePosition = { x: action.payload.x, y: action.payload.y };
    },

    toggleHandMode: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isHandMode = action.payload;

        return;
      }
      state.isHandMode = !state.isHandMode;
    },

    toggleGrabWindow: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.isGrabWindow = action.payload;

        return;
      }
      state.isGrabWindow = !state.isGrabWindow;
    },
  },
});

export const {
  incrementZoom,
  decrementZoom,
  changeZoomByValue,
  changeMousePosition,
  toggleHandMode,
  toggleGrabWindow,
} = editorSlice.actions;

export default editorSlice.reducer;
