import { configureStore } from "@reduxjs/toolkit";

import editor from "./editorSlice";
import moveable from "./moveableSlice";
import sidebarOpen from "./sidebarSlice";

export const store = configureStore({
  reducer: { sidebarOpen, moveable, editor },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
