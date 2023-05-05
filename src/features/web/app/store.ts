import { configureStore } from "@reduxjs/toolkit";

import counter from "./counterSlice";
import sidebarOpen from "./sidebarSlice";
import moveable from "./moveableSlice";

export const store = configureStore({
  reducer: { counter, sidebarOpen, moveable },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
